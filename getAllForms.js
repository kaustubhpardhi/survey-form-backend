const Form = require("./Models/form.model");
const mongoose = require("mongoose");
async function getAllForms(page, count) {
  const packages = await Form.find({})
    .skip((page - 1) * count)
    .limit(count)
    .sort({ createdAt: -1 })
    .exec();
  console.log("request sent to api");
  return packages;
}
module.exports = getAllForms;
