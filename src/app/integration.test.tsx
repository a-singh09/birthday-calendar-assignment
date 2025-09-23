/**
 * Integration tests for the complete Birthday Calendar workflow
 * Tests the full user journey from JSON input to calendar display
 */

import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, beforeEach } from "vitest";
import BirthdayCalendar from "./page";

// Sample test data
const sampleJsonData = [
  {
    name: "Tyrion Lannister",
    birthday: "1978-12-02",
  },
  {
    name: "Cersei Lannister",
    birthday: "1975-11-30",
  },
  {
    name: "Jon Snow",
    birthday: "1989-12-03",
  },
  {
    name: "Sansa Stark",
    birthday: "1992-08-15",
  },
];

const sampleJsonString = JSON.stringify(sampleJsonData, null, 2);

// Helper function to get form elements
const getFormElements = () => ({
  jsonTextarea: screen.getByLabelText(/birthday data \(json\)/i),
  yearSelect: screen.getByLabelText(/select year/i),
});

describe("Birthday Calendar Integration Tests", () => {
  beforeEach(() => {
    // Reset any global state before each test
  });

  it("renders the complete application with all components", () => {
    render(<BirthdayCalendar />);

    // Check header elements
    expect(
      screen.getByRole("heading", { name: /birthday calendar/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/enter birthday data in json format/i),
    ).toBeInTheDocument();

    // Check input section
    expect(
      screen.getByLabelText(/birthday data \(json\)/i),
    ).toBeInTheDocument();
    expect(screen.getByLabelText(/select year/i)).toBeInTheDocument();

    // Check calendar section (should show empty calendar initially)
    expect(screen.getByText("Monday")).toBeInTheDocument();
    expect(screen.getByText("Tuesday")).toBeInTheDocument();
    expect(screen.getByText("Wednesday")).toBeInTheDocument();
    expect(screen.getByText("Thursday")).toBeInTheDocument();
    expect(screen.getByText("Friday")).toBeInTheDocument();
    expect(screen.getByText("Saturday")).toBeInTheDocument();
    expect(screen.getByText("Sunday")).toBeInTheDocument();
  });

  it("completes the full workflow: JSON input → calendar display", async () => {
    render(<BirthdayCalendar />);

    const { jsonTextarea, yearSelect } = getFormElements();

    // Step 1: Enter JSON data
    fireEvent.change(jsonTextarea, { target: { value: sampleJsonString } });

    // Step 2: Select a specific year (2024)
    fireEvent.change(yearSelect, { target: { value: "2024" } });

    // Step 3: Verify calendar updates with people
    await waitFor(() => {
      // Check that people appear in the calendar
      // For 2024, December 2nd (Tyrion's birthday) falls on Monday
      // We should see person squares in the appropriate days
      const personSquares = screen.getAllByRole("button");
      expect(personSquares.length).toBeGreaterThan(0);
    });

    // Verify that hovering shows names
    const personSquares = screen.getAllByRole("button");
    if (personSquares.length > 0) {
      expect(personSquares[0]).toHaveAttribute("title");
    }
  });

  it("handles year changes and updates calendar correctly", async () => {
    render(<BirthdayCalendar />);

    const { jsonTextarea, yearSelect } = getFormElements();

    // Enter JSON data
    fireEvent.change(jsonTextarea, { target: { value: sampleJsonString } });

    // Test year 2024
    fireEvent.change(yearSelect, { target: { value: "2024" } });

    await waitFor(() => {
      const personSquares2024 = screen.getAllByRole("button");
      expect(personSquares2024.length).toBe(4); // Should have 4 people
    });

    // Change to year 2025 and verify calendar updates
    fireEvent.change(yearSelect, { target: { value: "2025" } });

    await waitFor(() => {
      const personSquares2025 = screen.getAllByRole("button");
      expect(personSquares2025.length).toBe(4); // Should still have 4 people
      // The positions might be different due to different days of week
    });
  });

  it("provides real-time updates when JSON input changes", async () => {
    render(<BirthdayCalendar />);

    const { jsonTextarea } = getFormElements();

    // Start with empty input - should show empty calendar
    expect(screen.queryAllByRole("button")).toHaveLength(0);

    // Add one person
    const onePersonJson = JSON.stringify([sampleJsonData[0]], null, 2);
    fireEvent.change(jsonTextarea, { target: { value: onePersonJson } });

    await waitFor(() => {
      expect(screen.getAllByRole("button")).toHaveLength(1);
    });

    // Add more people
    fireEvent.change(jsonTextarea, { target: { value: sampleJsonString } });

    await waitFor(() => {
      expect(screen.getAllByRole("button")).toHaveLength(4);
    });

    // Clear input
    fireEvent.change(jsonTextarea, { target: { value: "" } });

    await waitFor(() => {
      expect(screen.queryAllByRole("button")).toHaveLength(0);
    });
  });

  it("handles invalid JSON gracefully without crashing", async () => {
    render(<BirthdayCalendar />);

    const { jsonTextarea } = getFormElements();

    // Enter invalid JSON
    fireEvent.change(jsonTextarea, { target: { value: "{ invalid json }" } });

    // Should show error message
    await waitFor(() => {
      expect(screen.getByRole("alert")).toBeInTheDocument();
    });

    // Calendar should remain empty
    expect(screen.queryAllByRole("button")).toHaveLength(0);

    // Fix the JSON
    fireEvent.change(jsonTextarea, { target: { value: sampleJsonString } });

    // Error should disappear and calendar should populate
    await waitFor(() => {
      expect(screen.queryByRole("alert")).not.toBeInTheDocument();
      expect(screen.getAllByRole("button")).toHaveLength(4);
    });
  });

  it("displays people in correct age order within each day", async () => {
    // Create test data with people having birthdays on the same day but different ages
    const sameDayBirthdays = [
      { name: "Older Person", birthday: "1970-12-02" },
      { name: "Younger Person", birthday: "1990-12-02" },
      { name: "Middle Person", birthday: "1980-12-02" },
    ];

    render(<BirthdayCalendar />);

    const { jsonTextarea, yearSelect } = getFormElements();

    fireEvent.change(jsonTextarea, {
      target: { value: JSON.stringify(sameDayBirthdays, null, 2) },
    });
    fireEvent.change(yearSelect, { target: { value: "2024" } });

    await waitFor(() => {
      const personSquares = screen.getAllByRole("button");
      expect(personSquares).toHaveLength(3);

      // Verify they appear in age order (youngest first)
      // In 2024: Younger Person (34), Middle Person (44), Older Person (54)
      expect(personSquares[0]).toHaveAttribute(
        "title",
        "Younger Person (Age: 34)",
      );
      expect(personSquares[1]).toHaveAttribute(
        "title",
        "Middle Person (Age: 44)",
      );
      expect(personSquares[2]).toHaveAttribute(
        "title",
        "Older Person (Age: 54)",
      );
    });
  });

  it("applies day-empty class to days with no birthdays", async () => {
    // Use data that will leave some days empty
    const limitedData = [
      { name: "Monday Person", birthday: "2024-01-01" }, // Jan 1, 2024 is a Monday
    ];

    render(<BirthdayCalendar />);

    const { jsonTextarea, yearSelect } = getFormElements();

    fireEvent.change(jsonTextarea, {
      target: { value: JSON.stringify(limitedData, null, 2) },
    });
    fireEvent.change(yearSelect, { target: { value: "2024" } });

    await waitFor(() => {
      // Monday should have content
      const mondayColumn = screen.getByText("Monday").closest(".day-column");
      expect(mondayColumn).not.toHaveClass("day-empty");

      // Other days should be empty
      const tuesdayColumn = screen.getByText("Tuesday").closest(".day-column");
      expect(tuesdayColumn).toHaveClass("day-empty");
    });
  });

  it("maintains state consistency across multiple interactions", async () => {
    render(<BirthdayCalendar />);

    const { jsonTextarea, yearSelect } = getFormElements();

    // Multiple rapid changes
    fireEvent.change(jsonTextarea, { target: { value: sampleJsonString } });
    fireEvent.change(yearSelect, { target: { value: "2023" } });
    fireEvent.change(yearSelect, { target: { value: "2024" } });
    fireEvent.change(yearSelect, { target: { value: "2025" } });

    // Should settle on final state
    await waitFor(() => {
      expect(yearSelect).toHaveValue("2025");
      expect(screen.getAllByRole("button")).toHaveLength(4);
    });

    // Verify data integrity
    const personSquares = screen.getAllByRole("button");
    personSquares.forEach((square) => {
      expect(square).toHaveAttribute("title");
      expect(square.getAttribute("title")).toBeTruthy();
    });
  });
});
