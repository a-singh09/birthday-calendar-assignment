/**
 * CalendarSection component - displays 7-day calendar grid with birthday data
 */

import type { CalendarSectionProps } from "../../types";
import { DAY_NAMES } from "../../constants";
import { DayColumn } from "../DayColumn";

export function CalendarSection({ calendarData }: CalendarSectionProps) {
  return (
    <div className="calendar-container">
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
    </div>
  );
}
