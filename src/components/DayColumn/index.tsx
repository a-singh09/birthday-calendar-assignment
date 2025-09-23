/**
 * DayColumn component - displays people for a specific day of the week
 * Updated to use compact grid layout like the reference image
 */

import React from "react";
import type { DayColumnProps } from "../../types";
import { PersonSquare } from "../";

export function DayColumn({ dayName, people, isEmpty }: DayColumnProps) {
  // Calculate optimal grid layout based on number of people
  const getGridColumns = (count: number) => {
    if (count <= 2) return 2;
    if (count <= 4) return 2;
    if (count <= 6) return 3;
    if (count <= 9) return 3;
    return 4;
  };

  const gridColumns = getGridColumns(people.length);

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
          gridTemplateColumns: `repeat(${gridColumns}, 1fr)`,
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
            {/* Empty state - no visual content needed */}
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
                size={45} // Fixed size for grid layout
              />
            ))}
          </>
        )}
      </div>
    </div>
  );
}
