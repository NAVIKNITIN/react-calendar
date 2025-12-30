import { readFileSync, writeFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const distPath = join(__dirname, '..', 'dist', 'index.d.ts')

const typeDefinitions = `export interface CalendarProps {
  /** The selected date to highlight */
  date: Date
  /** Callback when the selected date changes */
  onDateChange?: (date: Date) => void
  /** The month/year to display (if not provided, uses date's month/year) */
  viewDate?: Date
  /** Callback when the view month/year changes (navigation, dropdowns) */
  onViewChange?: (viewDate: Date) => void
}

declare const Calendar: {
  (props: CalendarProps): JSX.Element
  displayName?: string
}

export default Calendar
export { Calendar }
export type { CalendarProps }
`

writeFileSync(distPath, typeDefinitions, 'utf-8')
console.log('✅ Type definitions fixed')

