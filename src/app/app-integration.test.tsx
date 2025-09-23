/**
 * Integration tests for the App component state management
 */

import { describe, it, expect } from "vitest";
import { parsePersonsJson, organizeIntoCalendarData } from "../utils";

describe("App Component State Management Integration", () => {
  const sampleJsonData = `[
    {"name": "Alice", "birthday": "1990-01-01"},
    {"name": "Bob", "birthday": "1985-01-02"},
    {"name": "Charlie", "birthday": "1995-01-01"}
  ]`;

  it("should process JSON input through the complete pipeline", () => {
    // Simulate the JSON input change handler logic
    const parseResult = parsePersonsJson(sampleJsonData);

    expect(parseResult.success).toBe(true);
    expect(parseResult.data).toHaveLength(3);

    if (parseResult.success && parseResult.data) {
      // Simulate calendar data calculation
      const calendarData = organizeIntoCalendarData(parseResult.data, 2024);

      // Verify calendar data structure
      expect(Object.keys(calendarData)).toHaveLength(7);

      // January 1, 2024 is Monday (day 0), January 2, 2024 is Tuesday (day 1)
      expect(calendarData[0]).toHaveLength(2); // Alice and Charlie on Monday
      expect(calendarData[1]).toHaveLength(1); // Bob on Tuesday

      // Verify people are sorted by age (youngest first)
      expect(calendarData[0][0].name).toBe("Charlie"); // Born 1995, youngest
      expect(calendarData[0][1].name).toBe("Alice"); // Born 1990, older
      expect(calendarData[1][0].name).toBe("Bob"); // Born 1985, oldest
    }
  });

  it("should handle year changes correctly", () => {
    const parseResult = parsePersonsJson(sampleJsonData);

    if (parseResult.success && parseResult.data) {
      // Test with different years
      const calendarData2023 = organizeIntoCalendarData(parseResult.data, 2023);
      const calendarData2024 = organizeIntoCalendarData(parseResult.data, 2024);

      // January 1, 2023 is Sunday (day 6), January 1, 2024 is Monday (day 0)
      // So the distribution should be different
      expect(calendarData2023[6]).toHaveLength(2); // Alice and Charlie on Sunday in 2023
      expect(calendarData2024[0]).toHaveLength(2); // Alice and Charlie on Monday in 2024
    }
  });

  it("should handle JSON validation errors correctly", () => {
    const invalidJsonInputs = [
      "",
      "{}",
      "[]",
      '{"invalid": "format"}',
      '[{"name": "Missing birthday"}]',
      '[{"birthday": "1990-01-01"}]', // Missing name
      '[{"name": "", "birthday": "1990-01-01"}]', // Empty name
      '[{"name": "Invalid Date", "birthday": "invalid-date"}]',
    ];

    invalidJsonInputs.forEach((invalidJson) => {
      const result = parsePersonsJson(invalidJson);
      expect(result.success).toBe(false);
      expect(result.error).toBeDefined();
    });
  });

  it("should maintain state consistency during updates", () => {
    // Simulate the state update flow
    let people: any[] = [];
    let selectedYear = 2024;
    let jsonError: string | null = null;

    // Simulate successful JSON input
    const parseResult = parsePersonsJson(sampleJsonData);
    if (parseResult.success && parseResult.data) {
      people = parseResult.data;
      jsonError = null;
    } else {
      jsonError = parseResult.error || "Unknown error";
    }

    expect(people).toHaveLength(3);
    expect(jsonError).toBeNull();

    // Simulate year change
    selectedYear = 2023;
    const calendarData = organizeIntoCalendarData(people, selectedYear);

    // Verify calendar recalculation
    expect(Object.keys(calendarData)).toHaveLength(7);

    // Simulate invalid JSON input
    const invalidResult = parsePersonsJson("invalid json");
    if (!invalidResult.success) {
      jsonError = invalidResult.error || "Unknown error";
      // People array should remain unchanged on error
    }

    expect(people).toHaveLength(3); // Should still have previous valid data
    expect(jsonError).toContain("Invalid JSON format");
  });

  it("should handle empty state correctly", () => {
    // Simulate empty initial state
    const people: any[] = [];
    const selectedYear = 2024;

    const calendarData = organizeIntoCalendarData(people, selectedYear);

    // Should have empty arrays for all days
    expect(Object.keys(calendarData)).toHaveLength(7);
    for (let i = 0; i < 7; i++) {
      expect(calendarData[i]).toHaveLength(0);
    }
  });
});
