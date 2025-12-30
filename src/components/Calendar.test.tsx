import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Calendar } from './Calendar'

describe('Calendar Component', () => {
  it('renders the calendar component', () => {
    const testDate = new Date(2024, 0, 15) // January 15, 2024
    render(<Calendar date={testDate} />)
    expect(screen.getByTestId('calendar')).toBeInTheDocument()
  })

  it('displays the correct month and year in the first row', () => {
    const testDate = new Date(2024, 0, 15) // January 15, 2024
    render(<Calendar date={testDate} />)
    expect(screen.getByText('January')).toBeInTheDocument()
    const yearSelect = screen.getByLabelText('Select year') as HTMLSelectElement
    expect(yearSelect.value).toBe('2024')
  })

  it('displays the correct month and year for different dates', () => {
    const testDate = new Date(2024, 5, 15) // June 15, 2024
    render(<Calendar date={testDate} />)
    expect(screen.getByText('June')).toBeInTheDocument()
    const yearSelect = screen.getByLabelText('Select year') as HTMLSelectElement
    expect(yearSelect.value).toBe('2024')
  })

  it('displays all days of the week in the second row', () => {
    const testDate = new Date(2024, 0, 15)
    render(<Calendar date={testDate} />)
    const weekdays = screen.getByTestId('calendar-weekdays')
    expect(weekdays).toBeInTheDocument()
    expect(screen.getByText('Sun')).toBeInTheDocument()
    expect(screen.getByText('Mon')).toBeInTheDocument()
    expect(screen.getByText('Tue')).toBeInTheDocument()
    expect(screen.getByText('Wed')).toBeInTheDocument()
    expect(screen.getByText('Thu')).toBeInTheDocument()
    expect(screen.getByText('Fri')).toBeInTheDocument()
    expect(screen.getByText('Sat')).toBeInTheDocument()
  })

  it('displays the calendar grid with dates', () => {
    const testDate = new Date(2024, 0, 15) // January 15, 2024
    render(<Calendar date={testDate} />)
    expect(screen.getByTestId('calendar-grid')).toBeInTheDocument()
    
    // Should contain the date 15
    expect(screen.getByText('15')).toBeInTheDocument()
  })

  it('highlights the correct date cell based on date prop', () => {
    const testDate = new Date(2024, 0, 15) // January 15, 2024
    render(<Calendar date={testDate} />)
    
    const selectedDate = screen.getByTestId('selected-date')
    expect(selectedDate).toBeInTheDocument()
    expect(selectedDate).toHaveTextContent('15')
    expect(selectedDate).toHaveClass('selected')
  })

  it('highlights different dates when date prop changes', () => {
    const testDate1 = new Date(2024, 0, 15)
    const { rerender } = render(<Calendar date={testDate1} />)
    
    expect(screen.getByTestId('selected-date')).toHaveTextContent('15')
    
    const testDate2 = new Date(2024, 0, 25)
    rerender(<Calendar date={testDate2} />)
    
    expect(screen.getByTestId('selected-date')).toHaveTextContent('25')
  })

  it('displays dates aligned with day headings', () => {
    // January 1, 2024 is a Monday, so it should be in the Monday column (index % 7 === 1)
    const testDate = new Date(2024, 0, 1)
    render(<Calendar date={testDate} />)
    
    const calendarGrid = screen.getByTestId('calendar-grid')
    const allDays = calendarGrid.querySelectorAll('.calendar-day')
    
    // Find January 1st in the grid by checking data-date attribute
    let jan1Index = -1
    allDays.forEach((day, index) => {
      const dateAttr = day.getAttribute('data-date')
      if (dateAttr === '2024-01-01') {
        jan1Index = index
      }
    })
    
    // January 1, 2024 is a Monday (weekday index 1: Sun=0, Mon=1, etc.)
    // Verify it's in the Monday column (index % 7 should equal 1)
    expect(jan1Index).toBeGreaterThanOrEqual(0)
    expect(jan1Index % 7).toBe(1) // Should be in Monday column
  })

  it('renders dates for the entire month correctly', () => {
    const testDate = new Date(2024, 0, 15) // January 2024 has 31 days
    render(<Calendar date={testDate} />)
    
    const calendarGrid = screen.getByTestId('calendar-grid')
    
    // Check that days 1-31 from January are present by checking data-date attributes
    for (let day = 1; day <= 31; day++) {
      const dateStr = `2024-01-${day.toString().padStart(2, '0')}`
      const dayElement = calendarGrid.querySelector(`[data-date="${dateStr}"]`)
      expect(dayElement).toBeInTheDocument()
      expect(dayElement).toHaveClass('current-month')
    }
  })

  it('handles month boundaries correctly', () => {
    const testDate = new Date(2024, 1, 15) // February 15, 2024
    render(<Calendar date={testDate} />)
    
    expect(screen.getByText('February')).toBeInTheDocument()
    const yearSelect = screen.getByLabelText('Select year') as HTMLSelectElement
    expect(yearSelect.value).toBe('2024')
    
    const calendarGrid = screen.getByTestId('calendar-grid')
    
    // February 2024 has 29 days (leap year)
    // Check for February 29 specifically (from current month)
    const feb29Element = calendarGrid.querySelector('[data-date="2024-02-29"]')
    expect(feb29Element).toBeInTheDocument()
    expect(feb29Element).toHaveClass('current-month')
  })

  it('handles year boundaries correctly', () => {
    const testDate = new Date(2023, 11, 31) // December 31, 2023
    render(<Calendar date={testDate} />)
    
    expect(screen.getByText('December')).toBeInTheDocument()
    const yearSelect = screen.getByLabelText('Select year') as HTMLSelectElement
    expect(yearSelect.value).toBe('2023')
    expect(screen.getByTestId('selected-date')).toHaveTextContent('31')
  })

  it('displays trailing and leading days from adjacent months', () => {
    const testDate = new Date(2024, 0, 15) // January 15, 2024
    render(<Calendar date={testDate} />)
    
    const calendarGrid = screen.getByTestId('calendar-grid')
    const allDays = calendarGrid.querySelectorAll('.calendar-day')
    
    // Should have 42 cells total (6 weeks * 7 days)
    expect(allDays.length).toBeGreaterThanOrEqual(35)
  })

  it('applies correct CSS classes to dates in current month vs other months', () => {
    const testDate = new Date(2024, 0, 15)
    render(<Calendar date={testDate} />)
    
    const calendarGrid = screen.getByTestId('calendar-grid')
    const currentMonthDays = calendarGrid.querySelectorAll('.calendar-day.current-month')
    const otherMonthDays = calendarGrid.querySelectorAll('.calendar-day.other-month')
    
    // Should have some days from current month
    expect(currentMonthDays.length).toBeGreaterThan(0)
    // Should have some days from other months (trailing/leading)
    expect(otherMonthDays.length).toBeGreaterThan(0)
  })

  it('renders correctly for leap year February', () => {
    const testDate = new Date(2024, 1, 29) // February 29, 2024 (leap year)
    render(<Calendar date={testDate} />)
    
    expect(screen.getByText('February')).toBeInTheDocument()
    const yearSelect = screen.getByLabelText('Select year') as HTMLSelectElement
    expect(yearSelect.value).toBe('2024')
    expect(screen.getByTestId('selected-date')).toHaveTextContent('29')
  })

  it('renders correctly for non-leap year February', () => {
    const testDate = new Date(2023, 1, 28) // February 28, 2023 (non-leap year)
    render(<Calendar date={testDate} />)
    
    expect(screen.getByText('February')).toBeInTheDocument()
    const yearSelect = screen.getByLabelText('Select year') as HTMLSelectElement
    expect(yearSelect.value).toBe('2023')
    expect(screen.getByTestId('selected-date')).toHaveTextContent('28')
    // Should not have day 29
    const day29 = screen.queryByText('29')
    if (day29) {
      // If it exists, it should be from a different month
      const day29Element = day29.closest('.calendar-day')
      expect(day29Element).toHaveClass('other-month')
    }
  })
})
