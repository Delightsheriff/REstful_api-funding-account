const mongoose = require("mongoose");

const touristSchema = new mongoose.Schema(
  {
    name: { type: String, require: true, lowercase: true },
    email: { type: String, require: true, unique: true, lowercase: true },
    nationality: { type: String, require: true, lowercase: true },
    purposeOfVisit: { type: String, require: true, lowercase: true },
    password: { type: String, require: true },
    refreshToken: { type: String },
    passkey: { type: String },
  },
  { timestamps: true }
);

const Tourists = mongoose.model("Tourists", touristSchema);

module.exports = Tourists;
