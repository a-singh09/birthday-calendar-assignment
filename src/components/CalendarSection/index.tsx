/**
 * CalendarSection component - displays 7-day calendar grid with birthday data
 */

import type { CalendarSectionProps } from "../../types";
import { DAY_NAMES } from "../../constants";

export function CalendarSection({ calendarData }: CalendarSectionProps) {
  return (
    <div className="calendar-container">
      {DAY_NAMES.map((dayName, dayIndex) => {
        const people = calendarData[dayIndex] || [];
        const isEmpty = people.length === 0;

        return (
          <div
            key={dayIndex}
            className={`day-column ${isEmpty ? "day-empty" : ""}`}
          >
            <div className="day-header">{dayName}</div>
            <div className="day-content">
              {people.map((person, personIndex) => (
                <div
                  key={`${person.name}-${personIndex}`}
                  className="person-placeholder"
                  style={{ backgroundColor: person.color }}
                  title={person.name}
                >
                  {/* PersonSquare component will be implemented in next task */}
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
