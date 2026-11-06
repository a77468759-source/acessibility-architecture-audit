import mongoose from 'mongoose'
import { getContent } from '../services/contentService.js'
import Feedback from '../models/Feedback.js'

const inMemoryFeedback = []

export async function getContentController(req, res, next) {
  try {
    const content = await getContent()
    res.json(content)
  } catch (error) {
    next(error)
  }
}

export async function submitFeedbackController(req, res, next) {
  try {
    const { name, email, message } = req.body || {}

    if (!name || !email || !message) {
      return res.status(400).json({
        message: 'Name, email and message are required.',
      })
    }

    let feedback

    if (mongoose.connection.readyState === 1) {
      feedback = await Feedback.create({ name, email, message })
    } else {
      feedback = {
        _id: String(inMemoryFeedback.length + 1),
        name,
        email,
        message,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }

      inMemoryFeedback.push(feedback)
    }

    return res.status(201).json({
      success: true,
      message: 'Thank you for your feedback.',
      feedback,
    })
  } catch (error) {
    return next(error)
  }
}
