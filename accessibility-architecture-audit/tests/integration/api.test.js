import request from 'supertest'
import { describe, expect, it } from 'vitest'

process.env.NODE_ENV = 'test'

const { app } = await import('../../server/src/server.js')

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
})
