import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import App from './App'

describe('App accessibility and UI', () => {
  beforeEach(() => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: async () => ({
          highlights: [{ label: 'Student support', value: '24/7 advising' }],
          departments: [{ name: 'Design', description: 'Creative learning', focus: 'UX' }],
          admissionsSteps: ['Review details', 'Apply now'],
        }),
      }),
    )
  })

  it('renders the primary navigation links', async () => {
    render(<App />)

    await waitFor(() => {
      expect(screen.getByRole('navigation', { name: /main navigation/i })).toBeInTheDocument()
    })

    expect(screen.getByRole('link', { name: 'Home' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'About' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Departments' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Admissions' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Feedback' })).toBeInTheDocument()
  })

  it('allows feedback submission', async () => {
    render(<App />)

    fireEvent.change(screen.getByLabelText(/name/i), { target: { value: 'Amina' } })
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'amina@example.com' } })
    fireEvent.change(screen.getByLabelText(/message/i), {
      target: { value: 'The website is easy to navigate.' },
    })

    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: async () => ({ success: true, message: 'Thank you for your feedback.' }),
      }),
    )

    fireEvent.click(screen.getByRole('button', { name: /submit feedback/i }))

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        '/api/feedback',
        expect.objectContaining({
          method: 'POST',
        }),
      )
    })
  })
})
