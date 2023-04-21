const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const surveyorSchema = new mongoose.Schema({
  surveyorname: {
    type: String,
  },
  surveyorid: {
    type: String,
  },
  surveyorpass: {
    type: String,
  },
});
surveyorSchema.pre("save", async function (next) {
  const surveyor = this;
  if (surveyor.isModified("surveyorpass")) {
    surveyor.surveyorpass = await bcrypt.hash(surveyor.surveyorpass, 10);
  }
  next();
});
surveyorSchema.methods.isValidPassword = async function (password) {
  const surveyor = this;
  const compare = await bcrypt.compare(password, surveyor.surveyorpass);
  return compare;
};

const Surveyor = mongoose.model("Surveyor", surveyorSchema);
module.exports = Surveyor;
