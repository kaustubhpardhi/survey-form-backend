const router = require("express").Router();
const formController = require("../Controllers/form.controller");

router.post("/saveform", formController.saveForm);
router.post("/getforms", formController.getForms);
router.get("/excel", formController.downloadExcel);
router.get("/totalcount", formController.getFormsCount);
router.get("/totalcounttoday", formController.getFormEntriesForToday);
router.post("/totalcountward", formController.getFormEntriesByWard);
router.post("/totalcountfse", formController.getformsfse);
module.exports = router;
