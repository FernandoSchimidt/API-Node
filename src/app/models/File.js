const mongoose = require("mongoose");

const FileSchema = new mongoose.Schema(
  {
    name: String,
    path: String,
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

FileSchema.virtual("url").get(function () {
  return `http://localhost:3000/files/${this.path}`;
});

module.exports = mongoose.model("File", FileSchema);
