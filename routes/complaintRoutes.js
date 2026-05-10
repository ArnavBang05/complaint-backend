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
const upload = require("../middleware/upload")

const adminOnly = (req, res, next) => {
  if (!req.user || req.user.role !== "admin") {
    return res.status(403).json({ message: "Admin access only ❌" })
  }
  next()
}

router.post("/create", protect, upload.single("image"), createComplaint)

router.get("/my", protect, getMyComplaints)
router.get("/all", protect, adminOnly, getAllComplaints)

router.put("/:id", protect, updateComplaint)
router.delete("/:id", protect, deleteComplaint)

module.exports = router