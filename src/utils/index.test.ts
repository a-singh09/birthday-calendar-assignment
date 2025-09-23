import { describe, it, expect } from "vitest";
import {
  getDayOfWeek,
  calculateAge,
  isValidDateFormat,
  isLeapYear,
  getDaysInMonth,
} from "./index";

describe("Date Calculation Utilities", () => {
  describe("getDayOfWeek", () => {
    it("should return correct day of week with Monday=0 mapping", () => {
      // Test known dates
      expect(getDayOfWeek("2024-01-01", 2024)).toBe(0); // Monday
      expect(getDayOfWeek("2024-01-02", 2024)).toBe(1); // Tuesday
      expect(getDayOfWeek("2024-01-03", 2024)).toBe(2); // Wednesday
      expect(getDayOfWeek("2024-01-04", 2024)).toBe(3); // Thursday
      expect(getDayOfWeek("2024-01-05", 2024)).toBe(4); // Friday
      expect(getDayOfWeek("2024-01-06", 2024)).toBe(5); // Saturday
      expect(getDayOfWeek("2024-01-07", 2024)).toBe(6); // Sunday
    });

    it("should handle leap year dates correctly", () => {
      // February 29th in leap year
      expect(getDayOfWeek("2000-02-29", 2000)).toBe(1); // Tuesday
      expect(getDayOfWeek("2004-02-29", 2004)).toBe(6); // Sunday
      expect(getDayOfWeek("2024-02-29", 2024)).toBe(3); // Thursday
    });

    it("should handle year boundaries correctly", () => {
      expect(getDayOfWeek("1999-12-31", 1999)).toBe(4); // Friday
      expect(getDayOfWeek("2000-01-01", 2000)).toBe(5); // Saturday
    });

    it("should handle same birthday in different years", () => {
      const birthday = "1990-06-15";
      expect(getDayOfWeek(birthday, 2020)).toBe(0); // Monday
      expect(getDayOfWeek(birthday, 2021)).toBe(1); // Tuesday
      expect(getDayOfWeek(birthday, 2022)).toBe(2); // Wednesday
    });
  });

  describe("calculateAge", () => {
    it("should calculate age correctly for different years", () => {
      expect(calculateAge("1990-06-15", 2024)).toBe(34);
      expect(calculateAge("2000-01-01", 2024)).toBe(24);
      expect(calculateAge("1985-12-25", 2024)).toBe(39);
    });

    it("should handle birth year same as selected year", () => {
      expect(calculateAge("2024-06-15", 2024)).toBe(0);
    });

    it("should handle future birth years", () => {
      expect(calculateAge("2030-06-15", 2024)).toBe(-6);
    });

    it("should handle leap year birthdays", () => {
      expect(calculateAge("2000-02-29", 2024)).toBe(24);
      expect(calculateAge("1996-02-29", 2024)).toBe(28);
    });
  });

  describe("isValidDateFormat", () => {
    it("should validate correct YYYY-MM-DD format", () => {
      expect(isValidDateFormat("2024-01-01")).toBe(true);
      expect(isValidDateFormat("1990-12-31")).toBe(true);
      expect(isValidDateFormat("2000-02-29")).toBe(true); // Leap year
    });

    it("should reject invalid formats", () => {
      expect(isValidDateFormat("24-01-01")).toBe(false); // Wrong year format
      expect(isValidDateFormat("2024-1-1")).toBe(false); // Missing leading zeros
      expect(isValidDateFormat("2024/01/01")).toBe(false); // Wrong separator
      expect(isValidDateFormat("01-01-2024")).toBe(false); // Wrong order
      expect(isValidDateFormat("2024-01")).toBe(false); // Missing day
      expect(isValidDateFormat("not-a-date")).toBe(false); // Not a date
    });

    it("should reject invalid dates", () => {
      expect(isValidDateFormat("2024-13-01")).toBe(false); // Invalid month
      expect(isValidDateFormat("2024-00-01")).toBe(false); // Invalid month
      expect(isValidDateFormat("2024-01-32")).toBe(false); // Invalid day
      expect(isValidDateFormat("2024-01-00")).toBe(false); // Invalid day
      expect(isValidDateFormat("2024-02-30")).toBe(false); // February 30th
      expect(isValidDateFormat("2024-04-31")).toBe(false); // April 31st
    });

    it("should handle leap year validation correctly", () => {
      expect(isValidDateFormat("2000-02-29")).toBe(true); // Leap year
      expect(isValidDateFormat("2004-02-29")).toBe(true); // Leap year
      expect(isValidDateFormat("1900-02-29")).toBe(false); // Not leap year (century)
      expect(isValidDateFormat("2001-02-29")).toBe(false); // Not leap year
      expect(isValidDateFormat("2100-02-29")).toBe(false); // Not leap year (century)
    });

    it("should handle edge cases", () => {
      expect(isValidDateFormat("")).toBe(false); // Empty string
      expect(isValidDateFormat("2024-02-29")).toBe(true); // Leap year 2024
      expect(isValidDateFormat("9999-12-31")).toBe(true); // Max valid year
      expect(isValidDateFormat("1000-01-01")).toBe(true); // Min valid year
      expect(isValidDateFormat("999-01-01")).toBe(false); // Below min year
    });
  });

  describe("isLeapYear", () => {
    it("should identify leap years correctly", () => {
      expect(isLeapYear(2000)).toBe(true); // Divisible by 400
      expect(isLeapYear(2004)).toBe(true); // Divisible by 4, not by 100
      expect(isLeapYear(2024)).toBe(true); // Divisible by 4, not by 100
    });

    it("should identify non-leap years correctly", () => {
      expect(isLeapYear(1900)).toBe(false); // Divisible by 100, not by 400
      expect(isLeapYear(2001)).toBe(false); // Not divisible by 4
      expect(isLeapYear(2100)).toBe(false); // Divisible by 100, not by 400
    });

    it("should handle edge cases", () => {
      expect(isLeapYear(1600)).toBe(true); // Divisible by 400
      expect(isLeapYear(1700)).toBe(false); // Divisible by 100, not by 400
      expect(isLeapYear(1800)).toBe(false); // Divisible by 100, not by 400
    });
  });

  describe("getDaysInMonth", () => {
    it("should return correct days for regular months", () => {
      expect(getDaysInMonth(2024, 1)).toBe(31); // January
      expect(getDaysInMonth(2024, 3)).toBe(31); // March
      expect(getDaysInMonth(2024, 4)).toBe(30); // April
      expect(getDaysInMonth(2024, 5)).toBe(31); // May
      expect(getDaysInMonth(2024, 6)).toBe(30); // June
      expect(getDaysInMonth(2024, 7)).toBe(31); // July
      expect(getDaysInMonth(2024, 8)).toBe(31); // August
      expect(getDaysInMonth(2024, 9)).toBe(30); // September
      expect(getDaysInMonth(2024, 10)).toBe(31); // October
      expect(getDaysInMonth(2024, 11)).toBe(30); // November
      expect(getDaysInMonth(2024, 12)).toBe(31); // December
    });

    it("should handle February in leap years", () => {
      expect(getDaysInMonth(2024, 2)).toBe(29); // Leap year
      expect(getDaysInMonth(2000, 2)).toBe(29); // Leap year
      expect(getDaysInMonth(2004, 2)).toBe(29); // Leap year
    });

    it("should handle February in non-leap years", () => {
      expect(getDaysInMonth(2023, 2)).toBe(28); // Non-leap year
      expect(getDaysInMonth(1900, 2)).toBe(28); // Non-leap year
      expect(getDaysInMonth(2001, 2)).toBe(28); // Non-leap year
    });
  });

  describe("Integration tests", () => {
    it("should handle complete workflow for leap year birthday", () => {
      const birthday = "2000-02-29";

      // Validate the date
      expect(isValidDateFormat(birthday)).toBe(true);

      // Calculate age in different years
      expect(calculateAge(birthday, 2024)).toBe(24);

      // Get day of week for the birthday in different years
      expect(getDayOfWeek(birthday, 2024)).toBe(3); // Thursday
      expect(getDayOfWeek(birthday, 2028)).toBe(1); // Tuesday
    });

    it("should handle edge case dates correctly", () => {
      const newYear = "1990-01-01";
      const newYearEve = "1990-12-31";

      expect(isValidDateFormat(newYear)).toBe(true);
      expect(isValidDateFormat(newYearEve)).toBe(true);

      expect(calculateAge(newYear, 2024)).toBe(34);
      expect(calculateAge(newYearEve, 2024)).toBe(34);

      // These should be different days of the week
      const dayNewYear = getDayOfWeek(newYear, 2024);
      const dayNewYearEve = getDayOfWeek(newYearEve, 2024);
      expect(dayNewYear).not.toBe(dayNewYearEve);
    });
  });
});
