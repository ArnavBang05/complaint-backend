require("dotenv").config()
const express = require("express")
const cors = require("cors")
const connectDB = require("./config/db")

// Routes
const authRoutes = require("./routes/authRoutes")
const complaintRoutes = require("./routes/complaintRoutes")

const app = express()

// ✅ CORS (important for frontend deployment)
app.use(cors({
  origin: "*", // for demo; restrict later if needed
  credentials: true
}))

// ✅ Middleware
app.use(express.json())

// ✅ Connect DB FIRST
connectDB()

// ✅ Routes
app.use("/api/auth", authRoutes)
app.use("/api/complaints", complaintRoutes)

// ✅ Health check route (better than just "/")
app.get("/", (req, res) => {
  res.status(200).json({ message: "API running 🚀" })
})

// ❗ Optional debug logs (can remove later)
console.log("AuthRoutes Loaded:", typeof authRoutes)
console.log("ComplaintRoutes Loaded:", typeof complaintRoutes)

// ❗ Global Error Handler (VERY IMPORTANT for production)
app.use((err, req, res, next) => {
  console.error("Server Error:", err.message)
  res.status(500).json({ message: "Server Error" })
})

// ✅ Port
const PORT = process.env.PORT || 5001

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`)
})