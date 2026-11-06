import express from 'express'
import {
  getContentController,
  submitFeedbackController,
} from '../controllers/contentController.js'

const router = express.Router()

router.get('/content', getContentController)
router.post('/feedback', submitFeedbackController)

export default router
