/**
 * CalendarSection component - displays 7-day calendar grid with birthday data
 * Enhanced with accessibility features for screen readers and keyboard navigation
 */

import type { CalendarSectionProps } from "../../types";
import { DAY_NAMES } from "../../constants";
import { DayColumn } from "../DayColumn";

export function CalendarSection({ calendarData }: CalendarSectionProps) {
  // Calculate total birthdays for accessibility announcement
  const totalBirthdays = Object.values(calendarData).reduce(
    (total, dayPeople) => total + dayPeople.length,
    0,
  );

  return (
    <section
      className="calendar-container"
      role="main"
      aria-label="Birthday calendar"
      aria-describedby="calendar-summary"
    >
      <div id="calendar-summary" className="sr-only" aria-live="polite">
        Birthday calendar showing {totalBirthdays} birthday
        {totalBirthdays === 1 ? "" : "s"} across the week
      </div>
      {DAY_NAMES.map((dayName, dayIndex) => {
        const people = calendarData[dayIndex] || [];
        const isEmpty = people.length === 0;

        return (
          <DayColumn
            key={dayIndex}
            dayName={dayName}
            people={people}
            isEmpty={isEmpty}
          />
        );
      })}
    </section>
  );
}
