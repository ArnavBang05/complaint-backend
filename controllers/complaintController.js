const Complaint = require("../models/Complaint")

// CREATE
exports.createComplaint = async (req, res) => {
  try {
    const { title, description, category, priority } = req.body

    if (!title || !description) {
      return res.status(400).json({ message: "All fields required" })
    }

    const image = req.file ? req.file.path : ""

    const complaint = await Complaint.create({
      user: req.user.id,
      title,
      description,
      category: category || "Other",
      priority: priority || "Medium",
      image,
      status: "pending"
    })

    res.status(201).json(complaint)

  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Error creating complaint" })
  }
}

// GET MY
exports.getMyComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find({ user: req.user.id })
      .sort({ createdAt: -1 })

    res.json(complaints)
  } catch {
    res.status(500).json({ message: "Error fetching complaints" })
  }
}

// GET ALL
exports.getAllComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find()
      .populate("user", "name email")
      .sort({ createdAt: -1 })

    res.json(complaints)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// UPDATE
exports.updateComplaint = async (req, res) => {
  try {
    const { status } = req.body

    const complaint = await Complaint.findById(req.params.id)

    if (!complaint) {
      return res.status(404).json({ message: "Not found" })
    }

    const isOwner = complaint.user.toString() === req.user.id
    const isAdmin = req.user.role === "admin"

    if (!isOwner && !isAdmin) {
      return res.status(401).json({ message: "Not authorized" })
    }

    complaint.status = status || complaint.status

    const updated = await complaint.save()
    res.json(updated)

  } catch {
    res.status(500).json({ message: "Error updating complaint" })
  }
}

// DELETE
exports.deleteComplaint = async (req, res) => {
  try {
    const complaint = await Complaint.findById(req.params.id)

    if (!complaint) {
      return res.status(404).json({ message: "Not found" })
    }

    const isOwner = complaint.user.toString() === req.user.id
    const isAdmin = req.user.role === "admin"

    if (!isOwner && !isAdmin) {
      return res.status(401).json({ message: "Not authorized" })
    }

    await complaint.deleteOne()

    res.json({ message: "Deleted successfully" })

  } catch {
    res.status(500).json({ message: "Error deleting complaint" })
  }
}