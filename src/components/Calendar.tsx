import { useMemo, useState, useEffect } from 'react'
import {
  getCalendarDays,
  getDayNames,
  isSameDay,
  isCurrentMonth,
} from '../utils/calendarUtils'
import { injectCalendarStyles } from '../utils/injectStyles'
import './Calendar.css'

export interface CalendarProps {
  /** The selected date to highlight */
  date: Date
  /** Callback when the selected date changes */
  onDateChange?: (date: Date) => void
  /** The month/year to display (if not provided, uses date's month/year) */
  viewDate?: Date
  /** Callback when the view month/year changes (navigation, dropdowns) */
  onViewChange?: (viewDate: Date) => void
}

/**
 * Reusable Calendar Component
 * Displays a calendar for the month and year of the provided date prop
 * Highlights the date cell that matches the date prop
 */
const Calendar = ({ date, onDateChange, viewDate: controlledViewDate, onViewChange }: CalendarProps) => {
  // Determine if we're in controlled mode
  const isControlled = controlledViewDate !== undefined
  
  // Initialize internal view date from date prop
  const [internalViewDate, setInternalViewDate] = useState(() => 
    new Date(date.getFullYear(), date.getMonth(), 1)
  )
  
  // Calculate the view date to use
  const viewDate = useMemo(() => {
    if (isControlled) {
      return new Date(controlledViewDate.getFullYear(), controlledViewDate.getMonth(), 1)
    }
    // Uncontrolled mode: use internal state
    return internalViewDate
  }, [isControlled, controlledViewDate, internalViewDate])
  
  // Sync internal state when date prop's month/year changes (only in uncontrolled mode)
  const dateYear = date.getFullYear()
  const dateMonth = date.getMonth()
  
  // Inject styles automatically when component mounts
  useEffect(() => {
    injectCalendarStyles()
  }, [])

  useEffect(() => {
    if (!isControlled) {
      const currentViewYear = internalViewDate.getFullYear()
      const currentViewMonth = internalViewDate.getMonth()
      
      // Only update if the selected date's month/year changed externally
      if (dateYear !== currentViewYear || dateMonth !== currentViewMonth) {
        setInternalViewDate(new Date(dateYear, dateMonth, 1))
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dateYear, dateMonth, isControlled])
  
  // Helper function to update view date
  const updateViewDate = (newViewDate: Date) => {
    if (isControlled && onViewChange) {
      // Controlled mode: call callback
      onViewChange(newViewDate)
    } else {
      // Uncontrolled mode: update internal state
      setInternalViewDate(newViewDate)
    }
  }
  
  const calendarDays = useMemo(() => getCalendarDays(viewDate), [viewDate])
  const dayNames = useMemo(() => getDayNames(), [])

  // Generate year options (current year ± 20 years for better UX)
  const currentYear = new Date().getFullYear()
  const years = useMemo(() => {
    const yearList = []
    for (let i = currentYear - 20; i <= currentYear + 20; i++) {
      yearList.push(i)
    }
    return yearList
  }, [currentYear])

  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]

  const handlePreviousMonth = () => {
    // Only change the view month, don't change the selected date
    const newViewDate = new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 1)
    updateViewDate(newViewDate)
  }

  const handleNextMonth = () => {
    // Only change the view month, don't change the selected date
    const newViewDate = new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1)
    updateViewDate(newViewDate)
  }

  const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    // Only change the view month, don't change the selected date
    const newMonth = parseInt(e.target.value, 10)
    const newViewDate = new Date(viewDate.getFullYear(), newMonth, 1)
    updateViewDate(newViewDate)
  }

  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    // Only change the view year, don't change the selected date
    const newYear = parseInt(e.target.value, 10)
    const newViewDate = new Date(newYear, viewDate.getMonth(), 1)
    updateViewDate(newViewDate)
  }

  return (
    <div className="calendar" data-testid="calendar">
      {/* First row: Month and Year with Navigation */}
      <div className="calendar-header" data-testid="calendar-header">
        <button
          className="calendar-nav-button calendar-nav-prev"
          onClick={handlePreviousMonth}
          aria-label="Previous month"
        >
          ‹
        </button>
        <div className="calendar-month-year-container">
          <select
            className="calendar-month-select"
            value={viewDate.getMonth()}
            onChange={handleMonthChange}
            aria-label="Select month"
          >
            {monthNames.map((month, index) => (
              <option key={month} value={index}>
                {month}
              </option>
            ))}
          </select>
          <select
            className="calendar-year-select"
            value={viewDate.getFullYear()}
            onChange={handleYearChange}
            aria-label="Select year"
          >
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
        <button
          className="calendar-nav-button calendar-nav-next"
          onClick={handleNextMonth}
          aria-label="Next month"
        >
          ›
        </button>
      </div>

      {/* Second row: Days of the week */}
      <div className="calendar-weekdays" data-testid="calendar-weekdays">
        {dayNames.map((day) => (
          <div key={day} className="calendar-weekday">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar grid: Dates */}
      <div className="calendar-grid" data-testid="calendar-grid">
        {calendarDays.map((day, index) => {
          if (!day) {
            return <div key={index} className="calendar-day empty"></div>
          }

          const isSelected = isSameDay(day, date)
          const isToday = isSameDay(day, new Date())
          const isInCurrentMonth = isCurrentMonth(day, viewDate)

          // Format date as YYYY-MM-DD using local time
          const year = day.getFullYear()
          const month = String(day.getMonth() + 1).padStart(2, '0')
          const dayOfMonth = String(day.getDate()).padStart(2, '0')
          const dateStr = `${year}-${month}-${dayOfMonth}`

          const handleDateClick = () => {
            if (onDateChange) {
              onDateChange(new Date(day.getFullYear(), day.getMonth(), day.getDate()))
            }
          }

          // Build class names: today is always shown, selected takes priority
          const classNames = [
            'calendar-day',
            isInCurrentMonth ? 'current-month' : 'other-month',
            isToday ? 'today' : '',
            isSelected ? 'selected' : '',
          ]
            .filter(Boolean)
            .join(' ')

          return (
            <div
              key={`${day.getTime()}-${index}`}
              className={classNames}
              data-testid={isSelected ? 'selected-date' : isToday ? 'today' : undefined}
              data-date={dateStr}
              onClick={handleDateClick}
              style={{ cursor: onDateChange ? 'pointer' : 'default' }}
            >
              {day.getDate()}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Calendar
export { Calendar }
// CalendarProps is already exported above as part of the interface
