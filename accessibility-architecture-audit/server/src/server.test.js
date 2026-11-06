import request from 'supertest'
import { describe, expect, it } from 'vitest'
import { app } from './server.js'

describe('API integration', () => {
  it('returns a health status from the server', async () => {
    const response = await request(app).get('/health')

    expect(response.status).toBe(200)
    expect(response.body.status).toBe('ok')
  })

  it('returns content for the educational site', async () => {
    const response = await request(app).get('/api/content')

    expect(response.status).toBe(200)
    expect(Array.isArray(response.body.departments)).toBe(true)
  })

  it('accepts a feedback submission', async () => {
    const response = await request(app)
      .post('/api/feedback')
      .send({
        name: 'Amina',
        email: 'amina@example.com',
        message: 'The site is easy to navigate.',
      })

    expect(response.status).toBe(201)
    expect(response.body.success).toBe(true)
  })
})
