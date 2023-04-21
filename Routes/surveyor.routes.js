const router = require("express").Router();
const surveyorController = require("../Controllers/surveyor.controller");

router.post("/surveyorentries", function (req, res) {
  surveyorController.surveyorFormCount(req, res);
});

module.exports = router;
