require("dotenv").config()
const express = require("express")
const cors = require("cors")
const connectDB = require("./config/db")

const authRoutes = require("./routes/authRoutes")
const complaintRoutes = require("./routes/complaintRoutes")

const app = express()

// ✅ FIXED CORS
app.use(cors({
  origin: [
    "http://localhost:3000",
    "https://complaint-frontend-xi.vercel.app"
  ],
  credentials: true
}))

app.use(express.json())

connectDB()

app.use("/api/auth", authRoutes)
app.use("/api/complaints", complaintRoutes)

app.get("/", (req, res) => {
  res.status(200).json({ message: "API running 🚀" })
})

app.use((err, req, res, next) => {
  console.error("Server Error:", err.message)
  res.status(500).json({ message: "Server Error" })
})

const PORT = process.env.PORT || 5001

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`)
})