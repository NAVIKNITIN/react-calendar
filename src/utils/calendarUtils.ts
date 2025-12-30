/**
 * Utility functions for calendar date calculations
 */

/**
 * Get the first day of the month (0-6, where 0 is Sunday)
 */
export const getFirstDayOfMonth = (date: Date): number => {
  const firstDay = new Date(date.getFullYear(), date.getMonth(), 1)
  return firstDay.getDay()
}

/**
 * Get the number of days in a month
 */
export const getDaysInMonth = (date: Date): number => {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
}

/**
 * Get array of dates for the calendar grid
 * Includes trailing days from previous month and leading days from next month
 */
export const getCalendarDays = (date: Date): (Date | null)[] => {
  const year = date.getFullYear()
  const month = date.getMonth()
  const firstDayOfMonth = getFirstDayOfMonth(date)
  const daysInMonth = getDaysInMonth(date)

  const calendarDays: (Date | null)[] = []

  // Add trailing days from previous month
  const daysFromPrevMonth = firstDayOfMonth
  const prevMonth = month === 0 ? 11 : month - 1
  const prevYear = month === 0 ? year - 1 : year
  const daysInPrevMonth = new Date(prevYear, prevMonth + 1, 0).getDate()

  for (let i = daysFromPrevMonth - 1; i >= 0; i--) {
    calendarDays.push(new Date(prevYear, prevMonth, daysInPrevMonth - i))
  }

  // Add days from current month
  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push(new Date(year, month, day))
  }

  // Add leading days from next month to fill the grid (6 rows * 7 days = 42 cells)
  const remainingCells = 42 - calendarDays.length
  const nextMonth = month === 11 ? 0 : month + 1
  const nextYear = month === 11 ? year + 1 : year

  for (let day = 1; day <= remainingCells; day++) {
    calendarDays.push(new Date(nextYear, nextMonth, day))
  }

  return calendarDays
}

/**
 * Format month and year for display (e.g., "January 2024")
 */
export const formatMonthYear = (date: Date): string => {
  return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
}

/**
 * Get day names for calendar header
 */
export const getDayNames = (): string[] => {
  return ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
}

/**
 * Check if two dates are the same day (ignoring time)
 */
export const isSameDay = (date1: Date, date2: Date): boolean => {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  )
}

/**
 * Check if a date belongs to the current month being displayed
 */
export const isCurrentMonth = (date: Date, currentMonth: Date): boolean => {
  return (
    date.getFullYear() === currentMonth.getFullYear() &&
    date.getMonth() === currentMonth.getMonth()
  )
}
