/**
 * Injects CSS styles into the document head if not already injected
 * This ensures styles are automatically applied when the component is used
 */

const STYLE_ID = 'react-smart-calendar-styles'
let stylesInjected = false

/**
 * CSS styles for the calendar component
 * This is the minified version of Calendar.css
 */
// CSS will be injected from the built CSS file
// This is a fallback - the actual CSS should come from dist/style.css after build
// For now, we'll read it dynamically or use the import
const calendarStyles = `.calendar{width:100%;max-width:600px;margin:0 auto;font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen,Ubuntu,Cantarell,Fira Sans,Droid Sans,Helvetica Neue,sans-serif;border:1px solid #e0e0e0;border-radius:8px;padding:20px;background-color:#fff;box-shadow:0 2px 8px #0000001a}.calendar-header{display:flex;align-items:center;justify-content:space-between;margin-bottom:20px;position:relative}.calendar-month-year-container{flex:1;display:flex;align-items:center;justify-content:center;gap:8px}.calendar-month-select,.calendar-year-select{font-size:24px;font-weight:600;color:#333;background:none;border:none;cursor:pointer;padding:4px 32px 4px 8px;border-radius:4px;transition:background-color .2s ease;appearance:none;-webkit-appearance:none;-moz-appearance:none;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23333' d='M6 9L1 4h10z'/%3E%3C/svg%3E");background-repeat:no-repeat;background-position:right 8px center;min-width:80px;max-width:120px;text-align:left;position:relative;z-index:1}.calendar-month-select{min-width:120px;max-width:150px}.calendar-year-select{min-width:80px;max-width:120px}.calendar-month-select option,.calendar-year-select option{padding:8px 12px;font-size:16px;background-color:#fff}.calendar-month-select:hover:not(:disabled),.calendar-year-select:hover:not(:disabled){background-color:#f0f0f0}.calendar-month-select:focus,.calendar-year-select:focus{outline:2px solid #007bff;outline-offset:2px;z-index:10}.calendar-month-select:disabled,.calendar-year-select:disabled{opacity:.5;cursor:not-allowed}.calendar-nav-button{background:none;border:none;color:#333;cursor:pointer;padding:0;width:40px;height:40px;display:flex;align-items:center;justify-content:center;border-radius:50%;transition:background-color .2s ease,color .2s ease;-webkit-user-select:none;user-select:none;font-size:32px}.calendar-nav-button:hover:not(:disabled){background-color:#f0f0f0;color:#007bff}.calendar-nav-button:active:not(:disabled){background-color:#e0e0e0}.calendar-nav-button:disabled{opacity:.3;cursor:not-allowed}.calendar-weekdays{display:grid;grid-template-columns:repeat(7,1fr);gap:4px;margin-bottom:8px}.calendar-weekday{text-align:center;font-weight:600;font-size:14px;color:#666;padding:8px 0;text-transform:uppercase;letter-spacing:.5px}.calendar-grid{display:grid;grid-template-columns:repeat(7,1fr);gap:4px}.calendar-day{aspect-ratio:1;display:flex;align-items:center;justify-content:center;font-size:16px;cursor:default;border-radius:4px;transition:background-color .2s ease}.calendar-day.current-month{color:#333;background-color:#f9f9f9}.calendar-day.other-month{color:#bbb;background-color:#f5f5f5}.calendar-day.today{border:2px solid #28a745;font-weight:600}.calendar-day.today:not(.selected){background-color:#f0f8f0;color:#28a745}.calendar-day.selected{background-color:#007bff;color:#fff;font-weight:600;box-shadow:0 2px 4px #007bff4d;border:2px solid #007bff}.calendar-day.today.selected{background-color:#007bff;color:#fff;border-color:#007bff}.calendar-day.empty{visibility:hidden}.calendar-day:hover:not(.selected):not(.other-month){background-color:#e9ecef}.calendar-day.today:hover:not(.selected){background-color:#e0f5e0}`

/**
 * Injects the calendar styles into the document head
 * This function is idempotent - it will only inject styles once
 */
export function injectCalendarStyles(): void {
  // Only inject in browser environment
  if (typeof document === 'undefined') {
    return
  }

  // Check if styles are already injected
  if (stylesInjected || document.getElementById(STYLE_ID)) {
    return
  }

  // Create style element
  const styleElement = document.createElement('style')
  styleElement.id = STYLE_ID
  styleElement.textContent = calendarStyles

  // Inject into head
  document.head.appendChild(styleElement)
  stylesInjected = true
}

