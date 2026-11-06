import { render, screen } from '@testing-library/react'
import App from '../../client/src/App.jsx'

it('renders accessible navigation links', () => {
  render(<App />)

  expect(screen.getByRole('navigation', { name: /main navigation/i })).toBeInTheDocument()
  expect(screen.getByRole('link', { name: /home/i })).toBeInTheDocument()
  expect(screen.getByRole('link', { name: /about/i })).toBeInTheDocument()
})
