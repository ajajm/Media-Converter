// Import all the modules and dependencies
import express from "express"
import cors from "cors"

// Setup cors and instance of express
const app = express()

// CORS configuration for production
const corsOptions = {
    origin: process.env.CORS_ORIGIN || '*',
    methods: ['GET', 'POST'],
    credentials: true
}

app.use(cors(corsOptions))
app.use(express.json())

const PORT = process.env.PORT || 5000

// Import the routes
import userRoutes from "./routes/userRoutes.js"

// Health check endpoint
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() })
})

// Implementing the routes
app.use("/v1/download", userRoutes)

// Start the server
app.listen(PORT, '0.0.0.0', () => { 
    console.log(`Server is listening at PORT: ${PORT}`)
    console.log(`Environment: ${process.env.NODE_ENV || 'development'}`)
})