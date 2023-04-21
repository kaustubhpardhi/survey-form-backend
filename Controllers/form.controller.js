const Form = require("../Models/form.model");
const mongoose = require("mongoose");
const uploadImage = require("../uploadImage.js");
const getAllForms = require("../getAllForms");
const redisClient = require("../Config/redis.config");

const formController = {
  saveForm: async (req, res) => {
    try {
      const url = await uploadImage(req.body.base64);

      if (!url) {
        console.log("failed");
        return res.status(400).send({ error: "Image upload failed" });
      }
      const form = new Form({
        ownerName: req.body.ownerName,
        shopOwner: req.body.shopOwnerName,
        fhName: req.body.fhName,
        gender: req.body.gender,
        qualification: req.body.qualification,
        occupation: req.body.occupation,
        email: req.body.email,
        number: req.body.number,
        shopName: req.body.shopName,
        shopAddress: req.body.shopAddress,
        category: req.body.businessCategory,
        since: req.body.since,
        employees: req.body.employees,
        size: req.body.size,
        zone: req.body.zone,
        ward: req.body.ward,
        license: req.body.license,
        fse: req.body.fse,
        latlong: req.body.latlong,
        url: url,
        surveyor: req.body.surveyor,
      });

      const savedForm = await form.save();
      res
        .status(201)
        .send({ message: "Form details saved successfully", data: savedForm });
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  },
  getForms: async (req, res) => {
    let results;
    let isCached = false;

    try {
      const { page, count } = req.body;
      const cacheResults = await redisClient.get("forms");
      if (cacheResults) {
        isCached = true;
        results = JSON.parse(cacheResults);
      } else {
        results = await getAllForms(page, count);
        console.log("hit redis");
        await redisClient.set("forms", JSON.stringify(results), {
          EX: 1800,
          NX: true,
        });
      }
      res.send({
        fromCache: isCached,
        data: results,
      });
    } catch (err) {
      console.log(err);
      res.status(400).send({ message: err.message });
    }
  },
  downloadExcel: async (req, res) => {
    try {
      await Form.find({}).then((data) => {
        console.log(data);
        res.json(data);
      });
    } catch (e) {
      res.status(400).send({ message: e.message });
    }
  },
  getFormsCount: async (req, res) => {
    try {
      const forms = await Form.find({});
      const totalforms = forms.length;
      if (!totalforms) {
        return res.status(400).send({ message: "No Form Entries Found" });
      }
      return res.status(200).send({ totalforms });
    } catch (error) {
      res.status(200).send({ error: error });
    }
  },

  getFormEntriesForToday: async (req, res) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date();
    tomorrow.setHours(24, 0, 0, 0);

    try {
      const formEntries = await Form.find({
        createdAt: {
          $gte: today,
          $lt: tomorrow,
        },
      });
      const count = formEntries.length;
      res.status(200).send({ count });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },
  getFormEntriesByWard: async (req, res) => {
    const zone = req.body.zone;
    try {
      const forms = await Form.find({ zone: zone });
      const totalforms = forms.length;
      res.status(200).send({ totalforms });
    } catch (error) {
      console.log(error);
      res.status(500).send({ Error: "Internal Server Error " });
    }
  },
  getformsfse: async (req, res) => {
    try {
      const fse = req.body.fse;
      const forms = await Form.find({
        fse: { $regex: new RegExp(fse, "i") },
      });
      const totalforms = forms.length;
      res.status(200).send({ totalforms });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },
};

module.exports = formController;
