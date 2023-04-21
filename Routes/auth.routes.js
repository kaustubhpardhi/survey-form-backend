const router = require("express").Router();
const authController = require("../Controllers/auth.controller");

router.post("/addsurveyor", function (req, res) {
  authController.addSurveyor(req, res);
});
router.post("/surveyorlogin", function (req, res) {
  authController.login(req, res);
});
module.exports = router;
