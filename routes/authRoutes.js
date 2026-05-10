const express = require("express")
const router = express.Router()

const { register, login, getProfile } = require("../controllers/authController")
const protect = require("../middleware/authMiddleware")

// Register
router.post("/register", register)

// Login
router.post("/login", login)

// Profile (Protected)
router.get("/profile", protect, getProfile)

// Test route
router.get("/test", (req, res) => {
  res.send("Auth route working")
})

module.exports = router