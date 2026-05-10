const mongoose = require("mongoose")

const complaintSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  title: String,
  description: String,
  status: {
    type: String,
    default: "pending"
  }
}, { timestamps: true })

module.exports = mongoose.model("Complaint", complaintSchema)