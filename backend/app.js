// Import all the modules and dependencies
import express from "express"
import cors from "cors"


// Setup cors and intance of express
const app = express()
app.use(cors())
app.use(express.json())

const PORT = process.env.PORT || 5000

// Import the routes
import userRoutes from "./routes/userRoutes.js"

// Implementing the routes
app.use("/v1/download", userRoutes)

// Start the server
app.listen(PORT, () => { console.log(`Server is listening at PORT: ${PORT}`)})