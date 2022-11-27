const mongoose = require("mongoose");
const newsSchema = mongoose.Schema(
  {
  text: String
  },
  { timestamps: true },
 
);
module.exports = mongoose.model('News',newsSchema)
