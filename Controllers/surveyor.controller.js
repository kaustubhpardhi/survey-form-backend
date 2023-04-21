const Form = require("../Models/form.model");
const mongoose = require("mongoose");
const redisClient = require("../Config/redis.config");

const surveyorController = {
  surveyorFormCount: async (req, res) => {
    const surveyor = req.body.surveyor;
    try {
      const entries = await Form.find({ surveyor: surveyor });
      const count = entries.length;
      res.status(200).send({ count });
    } catch (error) {
      console.log(error);
      res.status(500).send({ error: "data not found" });
    }
  },
};
module.exports = surveyorController;
