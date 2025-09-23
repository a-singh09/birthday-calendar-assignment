import { describe, it, expect } from "vitest";
import {
  getDayOfWeek,
  calculateAge,
  isValidDateFormat,
  isLeapYear,
  getDaysInMonth,
  validatePerson,
  parsePersonsJson,
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

describe("JSON Parsing and Validation", () => {
  describe("validatePerson", () => {
    it("should validate correct person objects", () => {
      const validPerson = {
        name: "John Doe",
        birthday: "1990-06-15",
      };

      const result = validatePerson(validPerson);
      expect(result.success).toBe(true);
      expect(result.data).toEqual({
        name: "John Doe",
        birthday: "1990-06-15",
      });
      expect(result.error).toBeUndefined();
    });

    it("should trim whitespace from names", () => {
      const personWithWhitespace = {
        name: "  John Doe  ",
        birthday: "1990-06-15",
      };

      const result = validatePerson(personWithWhitespace);
      expect(result.success).toBe(true);
      expect(result.data?.name).toBe("John Doe");
    });

    it("should reject non-object inputs", () => {
      expect(validatePerson(null).success).toBe(false);
      expect(validatePerson(undefined).success).toBe(false);
      expect(validatePerson("string").success).toBe(false);
      expect(validatePerson(123).success).toBe(false);
      expect(validatePerson([]).success).toBe(false);
    });

    it("should reject objects missing required fields", () => {
      const missingName = { birthday: "1990-06-15" };
      const missingBirthday = { name: "John Doe" };
      const emptyObject = {};

      expect(validatePerson(missingName).success).toBe(false);
      expect(validatePerson(missingName).error).toContain("name");

      expect(validatePerson(missingBirthday).success).toBe(false);
      expect(validatePerson(missingBirthday).error).toContain("birthday");

      expect(validatePerson(emptyObject).success).toBe(false);
    });

    it("should reject invalid field types", () => {
      const nameNotString = { name: 123, birthday: "1990-06-15" };
      const birthdayNotString = { name: "John Doe", birthday: 123 };

      expect(validatePerson(nameNotString).success).toBe(false);
      expect(validatePerson(nameNotString).error).toContain("string");

      expect(validatePerson(birthdayNotString).success).toBe(false);
      expect(validatePerson(birthdayNotString).error).toContain("string");
    });

    it("should reject empty names", () => {
      const emptyName = { name: "", birthday: "1990-06-15" };
      const whitespaceName = { name: "   ", birthday: "1990-06-15" };

      expect(validatePerson(emptyName).success).toBe(false);
      expect(validatePerson(emptyName).error).toContain("empty");

      expect(validatePerson(whitespaceName).success).toBe(false);
      expect(validatePerson(whitespaceName).error).toContain("empty");
    });

    it("should reject invalid birthday formats", () => {
      const invalidFormats = [
        { name: "John", birthday: "90-06-15" },
        { name: "John", birthday: "1990/06/15" },
        { name: "John", birthday: "15-06-1990" },
        { name: "John", birthday: "1990-6-15" },
        { name: "John", birthday: "1990-06-32" },
        { name: "John", birthday: "1990-13-15" },
        { name: "John", birthday: "not-a-date" },
        { name: "John", birthday: "2001-02-29" }, // Invalid leap year
      ];

      invalidFormats.forEach((person) => {
        const result = validatePerson(person);
        expect(result.success).toBe(false);
        expect(result.error).toContain("birthday");
      });
    });

    it("should accept valid leap year dates", () => {
      const leapYearPerson = { name: "John", birthday: "2000-02-29" };
      const result = validatePerson(leapYearPerson);
      expect(result.success).toBe(true);
    });
  });

  describe("parsePersonsJson", () => {
    it("should parse valid JSON array of people", () => {
      const validJson = JSON.stringify([
        { name: "John Doe", birthday: "1990-06-15" },
        { name: "Jane Smith", birthday: "1985-12-25" },
      ]);

      const result = parsePersonsJson(validJson);
      expect(result.success).toBe(true);
      expect(result.data).toHaveLength(2);
      expect(result.data?.[0]).toEqual({
        name: "John Doe",
        birthday: "1990-06-15",
      });
      expect(result.data?.[1]).toEqual({
        name: "Jane Smith",
        birthday: "1985-12-25",
      });
    });

    it("should handle empty or whitespace input", () => {
      expect(parsePersonsJson("").success).toBe(false);
      expect(parsePersonsJson("   ").success).toBe(false);
      expect(parsePersonsJson("\n\t").success).toBe(false);
    });

    it("should reject invalid JSON syntax", () => {
      const invalidJsons = [
        "not json",
        "{invalid: json}",
        "[{name: 'missing quotes'}]",
        '[{"name": "John", "birthday": "1990-06-15",}]', // trailing comma
        '[{"name": "John" "birthday": "1990-06-15"}]', // missing comma
      ];

      invalidJsons.forEach((json) => {
        const result = parsePersonsJson(json);
        expect(result.success).toBe(false);
        expect(result.error).toContain("JSON");
      });
    });

    it("should reject non-array JSON", () => {
      const nonArrayJsons = [
        '{"name": "John", "birthday": "1990-06-15"}', // object
        '"string"', // string
        "123", // number
        "true", // boolean
        "null", // null
      ];

      nonArrayJsons.forEach((json) => {
        const result = parsePersonsJson(json);
        expect(result.success).toBe(false);
        expect(result.error).toContain("array");
      });
    });

    it("should reject empty arrays", () => {
      const result = parsePersonsJson("[]");
      expect(result.success).toBe(false);
      expect(result.error).toContain("empty");
    });

    it("should validate each person in the array", () => {
      const jsonWithInvalidPerson = JSON.stringify([
        { name: "John Doe", birthday: "1990-06-15" },
        { name: "", birthday: "1985-12-25" }, // invalid: empty name
        { name: "Jane Smith", birthday: "1980-01-01" },
      ]);

      const result = parsePersonsJson(jsonWithInvalidPerson);
      expect(result.success).toBe(false);
      expect(result.error).toContain("index 1");
      expect(result.error).toContain("empty");
    });

    it("should detect duplicate names (case insensitive)", () => {
      const jsonWithDuplicates = JSON.stringify([
        { name: "John Doe", birthday: "1990-06-15" },
        { name: "jane smith", birthday: "1985-12-25" },
        { name: "JOHN DOE", birthday: "1980-01-01" }, // duplicate
      ]);

      const result = parsePersonsJson(jsonWithDuplicates);
      expect(result.success).toBe(false);
      expect(result.error).toContain("Duplicate");
      expect(result.error).toContain("john doe");
    });

    it("should handle various error scenarios with descriptive messages", () => {
      // Invalid person at specific index
      const invalidPersonJson = JSON.stringify([
        { name: "John", birthday: "1990-06-15" },
        { name: "Jane", birthday: "invalid-date" },
      ]);

      const result = parsePersonsJson(invalidPersonJson);
      expect(result.success).toBe(false);
      expect(result.error).toContain("index 1");
      expect(result.error).toContain("birthday");
    });

    it("should handle real-world sample data", () => {
      const sampleJson = JSON.stringify([
        { name: "Tyrion Lannister", birthday: "1978-12-02" },
        { name: "Cersei Lannister", birthday: "1975-11-30" },
        { name: "Daenerys Targaryen", birthday: "1991-11-24" },
      ]);

      const result = parsePersonsJson(sampleJson);
      expect(result.success).toBe(true);
      expect(result.data).toHaveLength(3);
      expect(result.data?.[0].name).toBe("Tyrion Lannister");
    });

    it("should handle edge cases with special characters in names", () => {
      const specialCharJson = JSON.stringify([
        { name: "José María", birthday: "1990-06-15" },
        { name: "李小明", birthday: "1985-12-25" },
        { name: "O'Connor", birthday: "1980-01-01" },
        { name: "Smith-Jones", birthday: "1975-05-10" },
      ]);

      const result = parsePersonsJson(specialCharJson);
      expect(result.success).toBe(true);
      expect(result.data).toHaveLength(4);
    });

    it("should handle leap year validation in JSON parsing", () => {
      const leapYearJson = JSON.stringify([
        { name: "Leap Year Baby", birthday: "2000-02-29" },
        { name: "Regular Person", birthday: "1990-06-15" },
      ]);

      const result = parsePersonsJson(leapYearJson);
      expect(result.success).toBe(true);
      expect(result.data).toHaveLength(2);

      // Test invalid leap year
      const invalidLeapYearJson = JSON.stringify([
        { name: "Invalid Leap", birthday: "2001-02-29" },
      ]);

      const invalidResult = parsePersonsJson(invalidLeapYearJson);
      expect(invalidResult.success).toBe(false);
      expect(invalidResult.error).toContain("birthday");
    });
  });

  describe("JSON Parsing Integration Tests", () => {
    it("should handle complete workflow from JSON to validated data", () => {
      const inputJson = JSON.stringify([
        { name: "  Alice Johnson  ", birthday: "1992-03-15" },
        { name: "Bob Wilson", birthday: "1988-07-22" },
        { name: "Charlie Brown", birthday: "2000-02-29" },
      ]);

      const result = parsePersonsJson(inputJson);

      expect(result.success).toBe(true);
      expect(result.data).toHaveLength(3);

      // Check that names are trimmed
      expect(result.data?.[0].name).toBe("Alice Johnson");

      // Check that all birthdays are valid
      result.data?.forEach((person) => {
        expect(isValidDateFormat(person.birthday)).toBe(true);
      });

      // Check leap year handling
      expect(result.data?.[2].birthday).toBe("2000-02-29");
    });

    it("should provide helpful error messages for debugging", () => {
      const testCases = [
        {
          json: "",
          expectedError: "empty",
        },
        {
          json: "invalid json",
          expectedError: "Invalid JSON",
        },
        {
          json: "{}",
          expectedError: "array",
        },
        {
          json: "[]",
          expectedError: "empty",
        },
        {
          json: JSON.stringify([{ name: "John" }]),
          expectedError: "birthday",
        },
        {
          json: JSON.stringify([{ birthday: "1990-01-01" }]),
          expectedError: "name",
        },
        {
          json: JSON.stringify([{ name: "", birthday: "1990-01-01" }]),
          expectedError: "empty",
        },
        {
          json: JSON.stringify([{ name: "John", birthday: "invalid" }]),
          expectedError: "birthday",
        },
      ];

      testCases.forEach(({ json, expectedError }) => {
        const result = parsePersonsJson(json);
        expect(result.success).toBe(false);
        expect(result.error?.toLowerCase()).toContain(
          expectedError.toLowerCase(),
        );
      });
    });
  });
});
