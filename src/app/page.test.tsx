/**
 * Tests for the main App component state management logic
 */

import { describe, it, expect } from "vitest";
import { parsePersonsJson, organizeIntoCalendarData } from "../utils";
import { CURRENT_YEAR, MIN_YEAR } from "../constants";

describe("BirthdayCalendar App Component Logic", () => {
  it("should have correct default year values", () => {
    expect(CURRENT_YEAR).toBe(new Date().getFullYear());
    expect(MIN_YEAR).toBe(2000);
    expect(CURRENT_YEAR).toBeGreaterThanOrEqual(MIN_YEAR);
  });

  it("should generate available years correctly", () => {
    const availableYears: number[] = [];
    for (let year = CURRENT_YEAR; year >= MIN_YEAR; year--) {
      availableYears.push(year);
    }

    expect(availableYears[0]).toBe(CURRENT_YEAR);
    expect(availableYears[availableYears.length - 1]).toBe(MIN_YEAR);
    expect(availableYears.length).toBe(CURRENT_YEAR - MIN_YEAR + 1);
  });

  it("should handle empty JSON input correctly", () => {
    const result = parsePersonsJson("");
    expect(result.success).toBe(false);
    expect(result.error).toContain("cannot be empty");
  });

  it("should handle valid JSON input correctly", () => {
    const validJson = JSON.stringify([
      { name: "Test Person", birthday: "1990-01-01" },
    ]);

    const result = parsePersonsJson(validJson);
    expect(result.success).toBe(true);
    expect(result.data).toHaveLength(1);
    expect(result.data?.[0].name).toBe("Test Person");
  });

  it("should handle invalid JSON input correctly", () => {
    const invalidJson = "{ invalid json }";

    const result = parsePersonsJson(invalidJson);
    expect(result.success).toBe(false);
    expect(result.error).toContain("Invalid JSON format");
  });

  it("should organize calendar data correctly", () => {
    const people = [
      { name: "Person 1", birthday: "1990-01-01" }, // Monday in 2024
      { name: "Person 2", birthday: "1990-01-02" }, // Tuesday in 2024
    ];

    const calendarData = organizeIntoCalendarData(people, 2024);

    // Should have entries for all 7 days
    expect(Object.keys(calendarData)).toHaveLength(7);

    // Should have people on correct days (January 1, 2024 is Monday = 0)
    expect(calendarData[0]).toHaveLength(1); // Monday
    expect(calendarData[1]).toHaveLength(1); // Tuesday
    expect(calendarData[0][0].name).toBe("Person 1");
    expect(calendarData[1][0].name).toBe("Person 2");
  });

  it("should handle empty people array correctly", () => {
    const calendarData = organizeIntoCalendarData([], 2024);

    // Should have entries for all 7 days, all empty
    expect(Object.keys(calendarData)).toHaveLength(7);
    for (let i = 0; i < 7; i++) {
      expect(calendarData[i]).toHaveLength(0);
    }
  });
});
