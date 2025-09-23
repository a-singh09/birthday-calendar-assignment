/**
 * CalendarSection component exports
 * Placeholder implementation for App component integration
 */

import type { CalendarSectionProps } from "../../types";

// Placeholder CalendarSection component
export function CalendarSection(props: CalendarSectionProps) {
  const dayCount = Object.keys(props.calendarData).length;
  const totalPeople = Object.values(props.calendarData).reduce(
    (sum, people) => sum + people.length, 
    0
  );
  
  return (
    <div className="calendar-section">
      <h2>Calendar Section</h2>
      <p>Days with data: {dayCount}</p>
      <p>Total people: {totalPeople}</p>
    </div>
  );
}
