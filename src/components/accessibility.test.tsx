/**
 * Accessibility tests for Birthday Calendar components
 */

import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import PersonSquare from "./PersonSquare";
import { DayColumn } from "./DayColumn";
import { CalendarSection } from "./CalendarSection";
import type { ProcessedPerson, CalendarData } from "../types";

describe("Accessibility Features", () => {
  const mockPerson: ProcessedPerson = {
    name: "John Doe",
    birthday: "1990-06-15",
    age: 33,
    dayOfWeek: 0,
    color: "#545D79",
  };

  describe("PersonSquare Accessibility", () => {
    it("should have proper title attribute for hover tooltip", () => {
      render(<PersonSquare person={mockPerson} size={40} />);

      const square = screen.getByRole("button");
      expect(square).toHaveAttribute("title", "John Doe (Age: 33)");
    });

    it("should have proper ARIA labels", () => {
      render(<PersonSquare person={mockPerson} size={40} />);

      const square = screen.getByRole("button");
      expect(square).toHaveAttribute(
        "aria-label",
        "Birthday person: John Doe, age 33, born 1990-06-15",
      );
    });

    it("should be keyboard accessible", () => {
      render(<PersonSquare person={mockPerson} size={40} />);

      const square = screen.getByRole("button");
      expect(square).toHaveAttribute("tabIndex", "0");
    });

    it("should have proper role for screen readers", () => {
      render(<PersonSquare person={mockPerson} size={40} />);

      const square = screen.getByRole("button");
      expect(square).toBeInTheDocument();
    });
  });

  describe("DayColumn Accessibility", () => {
    it("should have proper region role and labels", () => {
      render(
        <DayColumn dayName="Monday" people={[mockPerson]} isEmpty={false} />,
      );

      const region = screen.getByRole("region");
      expect(region).toHaveAttribute("aria-label", "Monday birthdays");
    });

    it("should have proper heading structure", () => {
      render(
        <DayColumn dayName="Monday" people={[mockPerson]} isEmpty={false} />,
      );

      const heading = screen.getByRole("heading", { level: 3 });
      expect(heading).toHaveTextContent("Monday");
    });

    it("should show empty state message when no birthdays", () => {
      render(<DayColumn dayName="Monday" people={[]} isEmpty={true} />);

      const emptyMessage = screen.getByRole("status");
      expect(emptyMessage).toHaveTextContent("No birthdays");
    });

    it("should have proper group labeling for multiple people", () => {
      const multiplePeople = [mockPerson, { ...mockPerson, name: "Jane Doe" }];

      render(
        <DayColumn dayName="Monday" people={multiplePeople} isEmpty={false} />,
      );

      const group = screen.getByRole("group");
      expect(group).toHaveAttribute("aria-label", "2 birthdays on Monday");
    });
  });

  describe("CalendarSection Accessibility", () => {
    const mockCalendarData: CalendarData = {
      0: [mockPerson], // Monday
      1: [], // Tuesday
      2: [], // Wednesday
      3: [], // Thursday
      4: [], // Friday
      5: [], // Saturday
      6: [], // Sunday
    };

    it("should have proper main section role", () => {
      render(<CalendarSection calendarData={mockCalendarData} />);

      const main = screen.getByRole("main");
      expect(main).toHaveAttribute("aria-label", "Birthday calendar");
    });

    it("should provide calendar summary for screen readers", () => {
      render(<CalendarSection calendarData={mockCalendarData} />);

      // The summary should be present but hidden (sr-only)
      const summary = screen.getByText(
        /Birthday calendar showing 1 birthday across the week/,
      );
      expect(summary).toBeInTheDocument();
    });

    it("should handle multiple birthdays in summary", () => {
      const multipleCalendarData: CalendarData = {
        0: [mockPerson, { ...mockPerson, name: "Jane Doe" }],
        1: [mockPerson],
        2: [],
        3: [],
        4: [],
        5: [],
        6: [],
      };

      render(<CalendarSection calendarData={multipleCalendarData} />);

      const summary = screen.getByText(
        /Birthday calendar showing 3 birthdays across the week/,
      );
      expect(summary).toBeInTheDocument();
    });
  });
});
