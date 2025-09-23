/**
 * PersonSquare component - renders individual colored squares for people
 * Enhanced with accessibility features including hover tooltips and keyboard navigation
 * Displays person initials and shows detailed tooltip on hover
 */

import React, { useRef, useState } from "react";
import { PersonSquareProps } from "../../types";
import { getInitials, formatDateOfBirth } from "../../utils";

const PersonSquare: React.FC<PersonSquareProps> = ({ person, size }) => {
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const squareRef = useRef<HTMLDivElement>(null);

  // Use responsive size for font scaling
  const actualSize = Math.max(Math.min(size, 80), 30);

  const squareStyle: React.CSSProperties = {
    backgroundColor: person.color,
    aspectRatio: "1",
    width: "100%",
    minHeight: `${actualSize}px`,
  };

  // Get initials for display
  const initials = getInitials(person.name);

  // Enhanced tooltip text with person details
  const tooltipText = `${person.name} (Age: ${person.age})`;

  // Detailed tooltip content with better formatting
  const detailedTooltip = `${person.name}\n${formatDateOfBirth(person.birthday)}\nAge: ${person.age}`;

  const handleMouseEnter = (e: React.MouseEvent) => {
    if (squareRef.current) {
      const rect = squareRef.current.getBoundingClientRect();
      setTooltipPosition({
        x: rect.left + rect.width / 2,
        y: rect.top,
      });
    }
  };

  return (
    <div className="person-square-container">
      <div className="person-square-wrapper" data-tooltip={detailedTooltip}>
        <div
          ref={squareRef}
          className="person-square"
          style={squareStyle}
          title={tooltipText}
          role="button"
          tabIndex={0}
          aria-label={`Birthday person: ${person.name}, age ${person.age}, born ${person.birthday}`}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              (e.target as HTMLElement).focus();
            }
          }}
        >
          <span
            className="person-initials"
            style={{
              fontSize: `${Math.max(actualSize * 0.3, 10)}px`,
              fontWeight: "700",
              color: "white",
              textShadow: "0 1px 2px rgba(0, 0, 0, 0.3)",
              userSelect: "none",
              pointerEvents: "none",
            }}
          >
            {initials}
          </span>
        </div>
      </div>
    </div>
  );
};

export default PersonSquare;
