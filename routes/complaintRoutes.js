const express = require("express")
const router = express.Router()

const {
  createComplaint,
  getMyComplaints,
  getAllComplaints,
  updateComplaint,
  deleteComplaint
} = require("../controllers/complaintController")

const protect = require("../middleware/authMiddleware")

// 🔒 Admin middleware (SAFE VERSION)
const adminOnly = (req, res, next) => {
  if (!req.user || req.user.role !== "admin") {
    return res.status(403).json({ message: "Admin access only ❌" })
  }
  next()
}

// ================== STUDENT ==================
router.post("/create", protect, createComplaint)
router.get("/my", protect, getMyComplaints)

// ================== ADMIN ==================
router.get("/all", protect, adminOnly, getAllComplaints)

// ================== COMMON ==================
router.put("/:id", protect, updateComplaint)
router.delete("/:id", protect, deleteComplaint)

module.exports = router