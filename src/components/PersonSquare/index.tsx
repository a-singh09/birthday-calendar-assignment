/**
 * PersonSquare component - renders individual colored squares for people
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

  return (
    <div
      className="person-square"
      style={squareStyle}
      title={person.name}
      role="button"
      tabIndex={0}
      aria-label={`${person.name}, age ${person.age}`}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          // Handle keyboard interaction if needed
          e.preventDefault();
        }
      }}
    />
  );
};

export default PersonSquare;
