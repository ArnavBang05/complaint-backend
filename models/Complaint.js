const mongoose = require("mongoose")

const complaintSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  title: {
    type: String,
    required: true
  },

  description: {
    type: String,
    required: true
  },

  image: {
    type: String,
    default: ""
  },

  category: {
    type: String,
    enum: ["Electrical", "Furniture", "Cleanliness", "Other"],
    default: "Other"
  },

  priority: {
    type: String,
    enum: ["Low", "Medium", "High"],
    default: "Medium"
  },

  status: {
    type: String,
    enum: ["pending", "resolved"],
    default: "pending"
  }

}, { timestamps: true })

module.exports = mongoose.model("Complaint", complaintSchema)