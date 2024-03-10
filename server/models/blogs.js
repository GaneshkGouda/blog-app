const mongoos = require("mongoose");
const Schema = mongoos.Schema;

const blogSchema = new Schema({
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});
module.exports = mongoos.model("Blogs", blogSchema);
