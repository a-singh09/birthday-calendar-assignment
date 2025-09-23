/**
 * DayColumn component - displays people for a specific day of the week
 * Updated to use compact grid layout like the reference image
 */

import React from "react";
import type { DayColumnProps } from "../../types";
import { PersonSquare } from "../";

export function DayColumn({ dayName, people, isEmpty }: DayColumnProps) {
  // Calculate optimal grid layout that maximizes square size while fitting all people
  const getOptimalGridConfig = (count: number) => {
    if (count === 0) return { columns: 1, rows: 1 };

    // Find the grid configuration that minimizes wasted space
    // while keeping squares as large as possible
    let bestConfig = { columns: 1, rows: count };
    let bestRatio = Number.MAX_SAFE_INTEGER;

    // Try different column configurations
    for (let cols = 1; cols <= Math.ceil(Math.sqrt(count * 1.5)); cols++) {
      const rows = Math.ceil(count / cols);
      const ratio = Math.max(cols, rows) / Math.min(cols, rows);

      // Prefer configurations closer to square aspect ratio
      if (ratio < bestRatio) {
        bestConfig = { columns: cols, rows };
        bestRatio = ratio;
      }
    }

    return bestConfig;
  };

  const { columns } = getOptimalGridConfig(people.length);

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
                size={60} // Base size for font scaling
              />
            ))}
          </>
        )}
      </div>
    </div>
  );
}
