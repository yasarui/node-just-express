const mongoose = require("mongoose");

courseSchema = mongoose.Schema({
    name: {
      type: String,
      required: true,
      minlength: 6,
      trim: true
    },
    student: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    }
})

module.exports = mongoose.model("Course",courseSchema);