/**
 * PersonSquare component - renders individual colored squares for people
 * Enhanced with accessibility features including hover tooltips and keyboard navigation
 */

import React from "react";
import { PersonSquareProps } from "../../types";

const PersonSquare: React.FC<PersonSquareProps> = ({ person, size }) => {
  const squareStyle: React.CSSProperties = {
    width: `${size}px`,
    height: `${size}px`,
    backgroundColor: person.color,
    "--square-size": `${size}px`,
  } as React.CSSProperties & { "--square-size": string };

  // Enhanced tooltip text with person details
  const tooltipText = `${person.name} (Age: ${person.age})`;

  return (
    <div
      className="person-square"
      style={squareStyle}
      title={tooltipText}
      role="button"
      tabIndex={0}
      aria-label={`Birthday person: ${person.name}, age ${person.age}, born ${person.birthday}`}
      aria-describedby={`person-${person.name.replace(/\s+/g, "-").toLowerCase()}-tooltip`}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          // Handle keyboard interaction - could show additional info or focus
          e.preventDefault();
          // For now, just ensure the element receives focus
          (e.target as HTMLElement).focus();
        }
      }}
      onFocus={(e) => {
        // Enhance focus visibility
        e.currentTarget.style.outline = "2px solid #3b82f6";
        e.currentTarget.style.outlineOffset = "2px";
      }}
      onBlur={(e) => {
        // Remove focus outline
        e.currentTarget.style.outline = "";
        e.currentTarget.style.outlineOffset = "";
      }}
    />
  );
};

export default PersonSquare;
