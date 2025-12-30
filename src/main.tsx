import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { useState } from 'react'
import Calendar from './components/Calendar'
import './components/Calendar.css'
import 'react-smart-calendar/style.css'

// Export App for Fast Refresh
export function App() {
  const [selectedDate, setSelectedDate] = useState(new Date())

  return (
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        <Calendar date={selectedDate} onDateChange={setSelectedDate} />
      </div>
  )
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

