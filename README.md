# React Calendar

A reusable calendar component for React with month and year navigation, built with TypeScript.

## Features

- 📅 Reusable calendar component with `date` prop
- ⬅️➡️ Month navigation with arrow buttons
- 📆 Year dropdown selector
- ✨ Highlights the selected date
- 🎨 Clean and modern UI design
- 📱 Responsive design
- 🔷 TypeScript support
- ♿ Accessible (ARIA labels)

## Installation

```bash
npm install react-smart-calendar
```

## Usage

### Default Import (Recommended)

```tsx
import { useState } from "react";
import Calendar from "react-smart-calendar";
import "react-smart-calendar/style.css";

function App() {
  const [selectedDate, setSelectedDate] = useState(new Date());

  return <Calendar date={selectedDate} onDateChange={setSelectedDate} />;
}
```

### Named Import

```tsx
import { useState } from "react";
import { Calendar } from "react-smart-calendar";
import "react-smart-calendar/style.css";

function App() {
  const [selectedDate, setSelectedDate] = useState(new Date());

  return <Calendar date={selectedDate} onDateChange={setSelectedDate} />;
}
```

## Props

### CalendarProps

| Prop           | Type                       | Required | Description                                                                       |
| -------------- | -------------------------- | -------- | --------------------------------------------------------------------------------- |
| `date`         | `Date`                     | Yes      | The date to display and highlight in the calendar                                 |
| `onDateChange` | `(date: Date) => void`     | No       | Callback function called when the selected date changes                           |
| `viewDate`     | `Date`                     | No       | The month/year to display (if not provided, uses `date`'s month/year)             |
| `onViewChange` | `(viewDate: Date) => void` | No       | Callback function called when the view month/year changes (navigation, dropdowns) |

## Examples

### Basic Usage

```tsx
import Calendar from "react-smart-calendar";
import "react-smart-calendar/style.css";

function MyCalendar() {
  return <Calendar date={new Date()} />;
}
```

### With Date Change Handler

```tsx
import { useState } from "react";
import Calendar from "react-smart-calendar";
import "react-smart-calendar/style.css";

function MyCalendar() {
  const [date, setDate] = useState(new Date());

  return <Calendar date={date} onDateChange={setDate} />;
}
```

### Fully Controlled Mode

Control both the selected date and the displayed month/year:

```tsx
import { useState } from "react";
import Calendar from "react-smart-calendar";
import "react-smart-calendar/style.css";

function MyCalendar() {
  const [date, setDate] = useState(new Date());
  const [viewDate, setViewDate] = useState(new Date());

  return (
    <Calendar
      date={date}
      onDateChange={setDate}
      viewDate={viewDate}
      onViewChange={setViewDate}
    />
  );
}
```

## Requirements

- React 18.0.0 or higher
- React DOM 18.0.0 or higher

## License

MIT
