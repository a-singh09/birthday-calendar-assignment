/**
 * DayColumn component - displays people for a specific day of the week
 * Updated to use compact grid layout like the reference image
 */

import React from "react";
import type { DayColumnProps } from "../../types";
import { PersonSquare } from "../";

export function DayColumn({ dayName, people, isEmpty }: DayColumnProps) {
  // Calculate optimal grid layout and size based on number of people
  const getGridConfig = (count: number) => {
    if (count === 1) return { columns: 1, size: 80 }; // Single person takes full width
    if (count === 2) return { columns: 1, size: 55 }; // Two people stack vertically, larger
    if (count === 3) return { columns: 1, size: 45 }; // Three people stack vertically
    if (count === 4) return { columns: 2, size: 45 }; // 2x2 grid
    if (count <= 6) return { columns: 2, size: 38 }; // 2x3 grid
    if (count <= 9) return { columns: 3, size: 32 }; // 3x3 grid
    if (count <= 12) return { columns: 3, size: 28 }; // 3x4 grid
    return { columns: 4, size: 25 }; // 4+ columns for many people
  };

  const { columns, size } = getGridConfig(people.length);

  return (
    <div
      className={`day-column-grid ${isEmpty ? "day-empty" : ""}`}
      role="region"
      aria-label={`${dayName} birthdays`}
      aria-describedby={`${dayName.toLowerCase()}-header`}
    >
      <div
        className="day-header-grid"
        id={`${dayName.toLowerCase()}-header`}
        role="heading"
        aria-level={3}
      >
        {dayName}
      </div>
      <div
        className="person-grid-container"
        style={{
          gridTemplateColumns: `repeat(${columns}, 1fr)`,
        }}
        role="group"
        aria-label={
          isEmpty
            ? `No birthdays on ${dayName}`
            : `${people.length} birthday${people.length === 1 ? "" : "s"} on ${dayName}`
        }
        aria-describedby={
          isEmpty ? undefined : `${dayName.toLowerCase()}-count`
        }
      >
        {isEmpty ? (
          <div className="empty-grid-message" aria-live="polite" role="status">
            No birthdays
          </div>
        ) : (
          <>
            <div id={`${dayName.toLowerCase()}-count`} className="sr-only">
              {people.length} birthday{people.length === 1 ? "" : "s"} on{" "}
              {dayName}
            </div>
            {people.map((person, personIndex) => (
              <PersonSquare
                key={`${person.name}-${personIndex}`}
                person={person}
                size={size} // Responsive size based on count
              />
            ))}
          </>
        )}
      </div>
    </div>
  );
}
