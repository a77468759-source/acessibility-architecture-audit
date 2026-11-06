import 'dotenv/config'
import cors from 'cors'
import express from 'express'
import mongoose from 'mongoose'
import contentRoutes from './routes/contentRoutes.js'
import { errorHandler } from './middleware/errorHandler.js'

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is healthy.' })
})

app.use('/api', contentRoutes)

app.use(errorHandler)

const connectDatabase = async () => {
  const mongoUri = process.env.MONGODB_URI

  if (!mongoUri) {
    console.log('No MONGODB_URI configured. Using in-memory feedback storage for this demo.')
    return
  }

  try {
    await mongoose.connect(mongoUri)
    console.log('Connected to MongoDB successfully.')
  } catch (error) {
    console.warn('MongoDB connection failed. Continuing without database persistence.')
    console.warn(error.message)
  }
}

if (process.env.NODE_ENV !== 'test') {
  connectDatabase()
}

export { app }

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
