const mongoose = require("mongoose");

module.exports = () => {
  return mongoose.connect(
    "mongodb+srv://Tejaswini:Tejaswini@cluster0.0kblt.mongodb.net/ONLINEDB?retryWrites=true&w=majority");
};
