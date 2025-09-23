/**
 * DayColumn component - displays people for a specific day of the week
 */

import type { DayColumnProps } from "../../types";

export function DayColumn({ dayName, people, isEmpty }: DayColumnProps) {
  return (
    <div className={`day-column ${isEmpty ? "day-empty" : ""}`}>
      <div className="day-header">{dayName}</div>
      <div className="person-squares-container">
        {people.map((person, personIndex) => (
          <div
            key={`${person.name}-${personIndex}`}
            className="person-square"
            style={{ backgroundColor: person.color }}
            title={person.name}
          >
            {/* PersonSquare component will be implemented in next task */}
          </div>
        ))}
      </div>
    </div>
  );
}
