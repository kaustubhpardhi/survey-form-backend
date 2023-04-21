const express = require("express");
const Surveyor = require("../Models/surveyor.model");

const authController = {
  addSurveyor: async (req, res) => {
    try {
      const { surveyorName, surveyorId, surveyorPass } = req.body;
      const idExist = await Surveyor.findOne({ surveyorid: surveyorId });

      if (idExist) {
        res.status(200).send({ message: "Surveyor Already Registered" });
      } else {
        const surveyor = new Surveyor({
          surveyorname: surveyorName,
          surveyorid: surveyorId,
          surveyorpass: surveyorPass,
        });
        const savedSurveyor = await surveyor.save();
        res.status(200).send({
          message: "Surveyor Added successfully",
          data: savedSurveyor,
        });
      }
    } catch (error) {
      console.log(error);
      console.log(error);
      res.status(400).send("internal server errror");
    }
  },
  login: async (req, res) => {
    const { surveyorId, surveyorPass } = req.body;
    try {
      console.log(surveyorId);
      console.log(surveyorPass);
      const surveyor = await Surveyor.findOne({ surveyorid: surveyorId });
      if (!surveyor) {
        return res.status(400).send({ error: "sorry email not found" });
      }
      //check for valid password
      const isMatched = await surveyor.isValidPassword(surveyorPass);
      console.log(isMatched);
      if (!isMatched) {
        return res.status(401).send({ error: "invalid credentials" });
      }
      res.status(200).send({ surveyorId: surveyor.surveyorid });
    } catch (error) {
      console.log(error);
      res.status(500).send({ error: "internal server error" });
    }
  },
};

module.exports = authController;
