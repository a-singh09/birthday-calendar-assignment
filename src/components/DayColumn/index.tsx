/**
 * DayColumn component - displays people for a specific day of the week
 */

import React, { useRef, useEffect, useState } from "react";
import type { DayColumnProps } from "../../types";
import { PersonSquare } from "../";
import { calculateSquareSize } from "../../utils";

export function DayColumn({ dayName, people, isEmpty }: DayColumnProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [squareSize, setSquareSize] = useState(40); // Default size

  useEffect(() => {
    const updateSquareSize = () => {
      if (containerRef.current && people.length > 0) {
        const containerWidth = containerRef.current.offsetWidth;
        const newSize = calculateSquareSize(containerWidth, people.length);
        setSquareSize(newSize);
      }
    };

    // Initial calculation
    updateSquareSize();

    // Update on window resize
    window.addEventListener("resize", updateSquareSize);

    return () => {
      window.removeEventListener("resize", updateSquareSize);
    };
  }, [people.length]);

  const containerStyle: React.CSSProperties = {
    display: "grid",
    gap: "4px",
    gridTemplateColumns: `repeat(auto-fit, minmax(${squareSize}px, 1fr))`,
    justifyItems: "center",
    alignItems: "center",
  };

  return (
    <div className={`day-column ${isEmpty ? "day-empty" : ""}`}>
      <div className="day-header">{dayName}</div>
      <div
        className="person-squares-container"
        ref={containerRef}
        style={containerStyle}
      >
        {people.map((person, personIndex) => (
          <PersonSquare
            key={`${person.name}-${personIndex}`}
            person={person}
            size={squareSize}
          />
        ))}
      </div>
    </div>
  );
}
