const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  preferences: {
    sources: { type: [String], default: [] },
    categories: { type: [String], default: [] },
    authors: { type: [String], default: [] },
  },
});
module.exports = mongoose.model("User", UserSchema);
