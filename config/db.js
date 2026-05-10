const mongoose = require("mongoose")

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000
    })

    console.log(`MongoDB Connected ✅: ${conn.connection.host}`)

  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error.message)

    // Prevent app crash loop
    setTimeout(connectDB, 5000)
  }
}

module.exports = connectDB