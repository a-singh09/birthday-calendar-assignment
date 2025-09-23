/**
 * PersonSquare component - renders individual colored squares for people
 * Enhanced with accessibility features including hover tooltips and keyboard navigation
 * Displays person initials and shows detailed tooltip on hover
 */

import React from "react";
import { PersonSquareProps } from "../../types";
import { getInitials, formatDateOfBirth } from "../../utils";

const PersonSquare: React.FC<PersonSquareProps> = ({ person, size }) => {
  const squareStyle: React.CSSProperties = {
    width: `${size}px`,
    height: `${size}px`,
    backgroundColor: person.color,
    "--square-size": `${size}px`,
  } as React.CSSProperties & { "--square-size": string };

  // Get initials for display
  const initials = getInitials(person.name);

  // Enhanced tooltip text with person details
  const tooltipText = `${person.name} (Age: ${person.age})`;

  // Detailed tooltip content with better formatting
  const detailedTooltip = `${person.name}\n${formatDateOfBirth(person.birthday)}\nAge: ${person.age}`;

  return (
    <div className="person-square-wrapper">
      <div
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
            fontSize: `${Math.max(size * 0.3, 10)}px`,
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
      <div className="tooltip">{detailedTooltip}</div>
    </div>
  );
};

export default PersonSquare;
