const Form = require("../Models/form.model");
const mongoose = require("mongoose");

const formController = {
  saveForm: async (req, res) => {
    try {
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
    try {
      const { page, count } = req.body;
      const packages = await Form.find({})
        .skip((page - 1) * count)
        .limit(count)
        .sort({ createdAt: -1 })
        .exec();
      res.status(200).send({ packages });
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
};

module.exports = formController;
