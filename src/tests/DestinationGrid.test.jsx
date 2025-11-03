import { render, screen, fireEvent } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import DestinationGrid from '../components/SimpleDestinationGridWithFilters'

describe('DestinationGrid', () => {
  test('renders destinations and filters by query', () => {
    render(<BrowserRouter><DestinationGrid /></BrowserRouter>)
    expect(screen.getByText('Sigiriya Rock Fortress')).toBeInTheDocument()

    const input = screen.getByPlaceholderText('Search destinations or regions...')
    fireEvent.change(input, { target: { value: 'ella' } })
    expect(screen.queryByText('Sigiriya Rock Fortress')).not.toBeInTheDocument()
    expect(screen.getByText('Ella Gap & Little Adam\'s Peak')).toBeInTheDocument()
  })

  test('filters by category', () => {
    render(<BrowserRouter><DestinationGrid /></BrowserRouter>)
    const select = screen.getByLabelText('Select category')
    fireEvent.change(select, { target: { value: 'nature' } })
    expect(screen.queryByText('Sigiriya Rock Fortress')).not.toBeInTheDocument()
    expect(screen.getByText('Ella Gap & Little Adam\'s Peak')).toBeInTheDocument()
  })

  test('shows no results message', () => {
    render(<BrowserRouter><DestinationGrid /></BrowserRouter>)
    const input = screen.getByPlaceholderText('Search destinations or regions...')
    fireEvent.change(input, { target: { value: 'nonexistent' } })
    expect(screen.getByText('No destinations match your search.')).toBeInTheDocument()
  })
})