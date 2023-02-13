const mongoose = require("mongoose");

const formSchema = new mongoose.Schema(
  {
    ownerName: {
      type: String,
    },
    shopOwner: {
      type: String,
    },
    fhName: {
      type: String,
    },
    gender: {
      type: String,
    },
    qualification: {
      type: String,
    },
    occupation: {
      type: String,
    },
    email: {
      type: String,
    },
    number: {
      type: Number,
    },
    shopName: {
      type: String,
    },
    shopAddress: {
      type: String,
    },
    category: {
      type: String,
    },
    since: {
      type: String,
    },
    employees: {
      type: String,
    },
    size: {
      type: String,
    },
    zone: {
      type: String,
    },
    ward: {
      type: String,
    },
    license: {
      type: String,
    },
    fse: {
      type: String,
    },
    latlong: {
      type: String,
    },
    url: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Forms", formSchema);
