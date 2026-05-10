const User = require("../models/User")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

// ================= REGISTER =================
exports.register = async (req, res) => {
  const { name, email, password } = req.body

  try {
    const userExists = await User.findOne({ email })
    if (userExists) {
      return res.status(400).json({ message: "User already exists" })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: "student" // 🔥 ensure default role
    })

    res.status(201).json({
      message: "User registered successfully"
    })

  } catch (error) {
    res.status(500).json({ message: "Server error" })
  }
}

// ================= LOGIN =================
exports.login = async (req, res) => {
  const { email, password } = req.body

  try {
    const user = await User.findOne({ email })

    if (!user) {
      return res.status(400).json({ message: "User not found" })
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" })
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    )

    res.json({
      token,
      role: user.role
    })

  } catch (error) {
    res.status(500).json({ message: "Server error" })
  }
}

// ================= PROFILE =================
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password")

    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }

    res.json(user)

  } catch (error) {
    res.status(500).json({ message: "Server error" })
  }
}