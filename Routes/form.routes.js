const router = require("express").Router();
const formController = require("../Controllers/form.controller");

router.post("/saveform", function (req, res) {
  formController.saveForm(req, res);
});

router.post("/getforms", function (req, res) {
  formController.getForms(req, res);
});

router.get("/excel", function (req, res) {
  formController.downloadExcel(req, res);
});

router.get("/totalcount", function (req, res) {
  formController.getFormsCount(req, res);
});

router.get("/totalcounttoday", function (req, res) {
  formController.getFormEntriesForToday(req, res);
});

router.post("/totalcountward", function (req, res) {
  formController.getFormEntriesByWard(req, res);
});

router.post("/totalcountfse", function (req, res) {
  formController.getformsfse(req, res);
});

module.exports = router;
