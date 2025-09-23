import { describe, it, expect } from "vitest";
import {
  getDayOfWeek,
  calculateAge,
  isValidDateFormat,
  isLeapYear,
  getDaysInMonth,
  validatePerson,
  parsePersonsJson,
  processPersons,
  sortPeopleByAge,
  assignColorsWithinDays,
  organizeIntoCalendarData,
  calculateSquareSize,
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

describe("Data Processing Pipeline", () => {
  describe("processPersons", () => {
    it("should transform Person array into ProcessedPerson array", () => {
      const people = [
        { name: "Alice", birthday: "1990-06-15" },
        { name: "Bob", birthday: "1985-12-25" },
      ];

      const result = processPersons(people, 2024);

      expect(result).toHaveLength(2);
      expect(result[0]).toEqual({
        name: "Alice",
        birthday: "1990-06-15",
        age: 34,
        dayOfWeek: expect.any(Number),
        color: expect.any(String),
      });
      expect(result[1]).toEqual({
        name: "Bob",
        birthday: "1985-12-25",
        age: 39,
        dayOfWeek: expect.any(Number),
        color: expect.any(String),
      });
    });

    it("should assign colors cyclically from color palette", () => {
      const people = [
        { name: "Person1", birthday: "1990-01-01" },
        { name: "Person2", birthday: "1990-01-02" },
        { name: "Person3", birthday: "1990-01-03" },
        { name: "Person4", birthday: "1990-01-04" },
        { name: "Person5", birthday: "1990-01-05" },
        { name: "Person6", birthday: "1990-01-06" }, // Should cycle back to first color
      ];

      const result = processPersons(people, 2024);

      expect(result[0].color).toBe("#545D79"); // First color
      expect(result[1].color).toBe("#8AB721"); // Second color
      expect(result[2].color).toBe("#C77D99"); // Third color
      expect(result[3].color).toBe("#78CAE3"); // Fourth color
      expect(result[4].color).toBe("#E64A33"); // Fifth color
      expect(result[5].color).toBe("#545D79"); // Cycles back to first
    });

    it("should calculate correct ages for selected year", () => {
      const people = [
        { name: "Young", birthday: "2000-01-01" },
        { name: "Old", birthday: "1950-01-01" },
        { name: "Future", birthday: "2030-01-01" },
      ];

      const result = processPersons(people, 2024);

      expect(result[0].age).toBe(24);
      expect(result[1].age).toBe(74);
      expect(result[2].age).toBe(-6); // Future birth year
    });

    it("should calculate correct day of week for birthdays", () => {
      const people = [
        { name: "Monday", birthday: "2024-01-01" }, // Known Monday
        { name: "Sunday", birthday: "2024-01-07" }, // Known Sunday
      ];

      const result = processPersons(people, 2024);

      expect(result[0].dayOfWeek).toBe(0); // Monday
      expect(result[1].dayOfWeek).toBe(6); // Sunday
    });

    it("should handle empty array", () => {
      const result = processPersons([], 2024);
      expect(result).toEqual([]);
    });

    it("should handle leap year birthdays", () => {
      const people = [{ name: "LeapBaby", birthday: "2000-02-29" }];

      const result = processPersons(people, 2024);

      expect(result[0].age).toBe(24);
      expect(result[0].dayOfWeek).toBe(3); // Thursday in 2024
    });
  });

  describe("sortPeopleByAge", () => {
    it("should sort people by age (youngest first)", () => {
      const people = [
        {
          name: "Old",
          birthday: "1950-01-01",
          age: 74,
          dayOfWeek: 0,
          color: "#545D79",
        },
        {
          name: "Young",
          birthday: "2000-01-01",
          age: 24,
          dayOfWeek: 1,
          color: "#8AB721",
        },
        {
          name: "Middle",
          birthday: "1980-01-01",
          age: 44,
          dayOfWeek: 2,
          color: "#C77D99",
        },
      ];

      const result = sortPeopleByAge(people);

      expect(result[0].name).toBe("Young");
      expect(result[0].age).toBe(24);
      expect(result[1].name).toBe("Middle");
      expect(result[1].age).toBe(44);
      expect(result[2].name).toBe("Old");
      expect(result[2].age).toBe(74);
    });

    it("should maintain stable sort for same ages", () => {
      const people = [
        {
          name: "First",
          birthday: "1990-01-01",
          age: 34,
          dayOfWeek: 0,
          color: "#545D79",
        },
        {
          name: "Second",
          birthday: "1990-06-15",
          age: 34,
          dayOfWeek: 1,
          color: "#8AB721",
        },
        {
          name: "Third",
          birthday: "1990-12-31",
          age: 34,
          dayOfWeek: 2,
          color: "#C77D99",
        },
      ];

      const result = sortPeopleByAge(people);

      // All should have same age, order should be maintained
      expect(result[0].name).toBe("First");
      expect(result[1].name).toBe("Second");
      expect(result[2].name).toBe("Third");
      result.forEach((person) => expect(person.age).toBe(34));
    });

    it("should handle empty array", () => {
      const result = sortPeopleByAge([]);
      expect(result).toEqual([]);
    });

    it("should handle single person", () => {
      const people = [
        {
          name: "Only",
          birthday: "1990-01-01",
          age: 34,
          dayOfWeek: 0,
          color: "#545D79",
        },
      ];

      const result = sortPeopleByAge(people);
      expect(result).toEqual(people);
    });

    it("should not mutate original array", () => {
      const people = [
        {
          name: "Old",
          birthday: "1950-01-01",
          age: 74,
          dayOfWeek: 0,
          color: "#545D79",
        },
        {
          name: "Young",
          birthday: "2000-01-01",
          age: 24,
          dayOfWeek: 1,
          color: "#8AB721",
        },
      ];

      const original = [...people];
      const result = sortPeopleByAge(people);

      expect(people).toEqual(original); // Original unchanged
      expect(result[0].name).toBe("Young"); // Result is sorted
    });

    it("should handle negative ages (future birth years)", () => {
      const people = [
        {
          name: "Past",
          birthday: "1990-01-01",
          age: 34,
          dayOfWeek: 0,
          color: "#545D79",
        },
        {
          name: "Future",
          birthday: "2030-01-01",
          age: -6,
          dayOfWeek: 1,
          color: "#8AB721",
        },
        {
          name: "Present",
          birthday: "2024-01-01",
          age: 0,
          dayOfWeek: 2,
          color: "#C77D99",
        },
      ];

      const result = sortPeopleByAge(people);

      expect(result[0].name).toBe("Future"); // -6 age (youngest)
      expect(result[1].name).toBe("Present"); // 0 age
      expect(result[2].name).toBe("Past"); // 34 age (oldest)
    });
  });

  describe("assignColorsWithinDays", () => {
    it("should assign colors cyclically within each day", () => {
      const peopleByDay = {
        0: [
          // Monday
          {
            name: "M1",
            birthday: "1990-01-01",
            age: 34,
            dayOfWeek: 0,
            color: "old-color",
          },
          {
            name: "M2",
            birthday: "1985-01-01",
            age: 39,
            dayOfWeek: 0,
            color: "old-color",
          },
          {
            name: "M3",
            birthday: "1980-01-01",
            age: 44,
            dayOfWeek: 0,
            color: "old-color",
          },
        ],
        1: [
          // Tuesday
          {
            name: "T1",
            birthday: "1990-01-02",
            age: 34,
            dayOfWeek: 1,
            color: "old-color",
          },
        ],
        2: [], // Wednesday - empty
      };

      const result = assignColorsWithinDays(peopleByDay);

      // Monday should have colors assigned cyclically
      expect(result[0][0].color).toBe("#545D79"); // First color
      expect(result[0][1].color).toBe("#8AB721"); // Second color
      expect(result[0][2].color).toBe("#C77D99"); // Third color

      // Tuesday should start from first color again
      expect(result[1][0].color).toBe("#545D79"); // First color

      // Wednesday should remain empty
      expect(result[2]).toEqual([]);
    });

    it("should handle more people than colors available", () => {
      const peopleByDay = {
        0: [
          {
            name: "P1",
            birthday: "1990-01-01",
            age: 34,
            dayOfWeek: 0,
            color: "old",
          },
          {
            name: "P2",
            birthday: "1990-01-01",
            age: 34,
            dayOfWeek: 0,
            color: "old",
          },
          {
            name: "P3",
            birthday: "1990-01-01",
            age: 34,
            dayOfWeek: 0,
            color: "old",
          },
          {
            name: "P4",
            birthday: "1990-01-01",
            age: 34,
            dayOfWeek: 0,
            color: "old",
          },
          {
            name: "P5",
            birthday: "1990-01-01",
            age: 34,
            dayOfWeek: 0,
            color: "old",
          },
          {
            name: "P6",
            birthday: "1990-01-01",
            age: 34,
            dayOfWeek: 0,
            color: "old",
          }, // Should cycle back
        ],
      };

      const result = assignColorsWithinDays(peopleByDay);

      expect(result[0][0].color).toBe("#545D79"); // 1st color
      expect(result[0][1].color).toBe("#8AB721"); // 2nd color
      expect(result[0][2].color).toBe("#C77D99"); // 3rd color
      expect(result[0][3].color).toBe("#78CAE3"); // 4th color
      expect(result[0][4].color).toBe("#E64A33"); // 5th color
      expect(result[0][5].color).toBe("#545D79"); // Cycles back to 1st
    });

    it("should handle empty days", () => {
      const peopleByDay = {
        0: [],
        1: [],
        2: [],
        3: [],
        4: [],
        5: [],
        6: [],
      };

      const result = assignColorsWithinDays(peopleByDay);

      for (let i = 0; i < 7; i++) {
        expect(result[i]).toEqual([]);
      }
    });

    it("should not mutate original data", () => {
      const peopleByDay = {
        0: [
          {
            name: "P1",
            birthday: "1990-01-01",
            age: 34,
            dayOfWeek: 0,
            color: "original",
          },
        ],
      };

      const original = JSON.parse(JSON.stringify(peopleByDay));
      const result = assignColorsWithinDays(peopleByDay);

      expect(peopleByDay).toEqual(original); // Original unchanged
      expect(result[0][0].color).toBe("#545D79"); // Result has new color
    });
  });

  describe("organizeIntoCalendarData", () => {
    it("should organize people into calendar structure", () => {
      const people = [
        { name: "Monday1", birthday: "2024-01-01" }, // Monday
        { name: "Monday2", birthday: "2024-01-08" }, // Monday
        { name: "Tuesday1", birthday: "2024-01-02" }, // Tuesday
        { name: "Sunday1", birthday: "2024-01-07" }, // Sunday
      ];

      const result = organizeIntoCalendarData(people, 2024);

      // Should have all 7 days
      expect(Object.keys(result)).toHaveLength(7);

      // Monday (day 0) should have 2 people
      expect(result[0]).toHaveLength(2);
      expect(result[0][0].name).toBe("Monday1");
      expect(result[0][1].name).toBe("Monday2");

      // Tuesday (day 1) should have 1 person
      expect(result[1]).toHaveLength(1);
      expect(result[1][0].name).toBe("Tuesday1");

      // Wednesday through Saturday should be empty
      expect(result[2]).toHaveLength(0);
      expect(result[3]).toHaveLength(0);
      expect(result[4]).toHaveLength(0);
      expect(result[5]).toHaveLength(0);

      // Sunday (day 6) should have 1 person
      expect(result[6]).toHaveLength(1);
      expect(result[6][0].name).toBe("Sunday1");
    });

    it("should sort people by age within each day", () => {
      const people = [
        { name: "Old Monday", birthday: "1950-01-01" }, // Monday, age 74
        { name: "Young Monday", birthday: "2000-01-01" }, // Monday, age 24
        { name: "Middle Monday", birthday: "1980-01-08" }, // Monday, age 44
      ];

      const result = organizeIntoCalendarData(people, 2024);

      // All should be on Monday (day 0)
      expect(result[0]).toHaveLength(3);

      // Should be sorted by age (youngest first)
      expect(result[0][0].name).toBe("Young Monday");
      expect(result[0][0].age).toBe(24);
      expect(result[0][1].name).toBe("Middle Monday");
      expect(result[0][1].age).toBe(44);
      expect(result[0][2].name).toBe("Old Monday");
      expect(result[0][2].age).toBe(74);
    });

    it("should assign colors within each day", () => {
      const people = [
        { name: "M1", birthday: "2024-01-01" }, // Monday
        { name: "M2", birthday: "2024-01-08" }, // Monday
        { name: "T1", birthday: "2024-01-02" }, // Tuesday
      ];

      const result = organizeIntoCalendarData(people, 2024);

      // Monday people should have different colors
      expect(result[0][0].color).toBe("#545D79");
      expect(result[0][1].color).toBe("#8AB721");

      // Tuesday person should start from first color again
      expect(result[1][0].color).toBe("#545D79");
    });

    it("should handle empty input", () => {
      const result = organizeIntoCalendarData([], 2024);

      // Should have all 7 days, all empty
      expect(Object.keys(result)).toHaveLength(7);
      for (let i = 0; i < 7; i++) {
        expect(result[i]).toEqual([]);
      }
    });

    it("should handle leap year birthdays correctly", () => {
      const people = [{ name: "Leap Baby", birthday: "2000-02-29" }];

      const result = organizeIntoCalendarData(people, 2024);

      // Feb 29, 2024 is a Thursday (day 3)
      expect(result[3]).toHaveLength(1);
      expect(result[3][0].name).toBe("Leap Baby");
      expect(result[3][0].age).toBe(24);
      expect(result[3][0].dayOfWeek).toBe(3);
    });

    it("should handle same birthday different years", () => {
      const people = [
        { name: "Older Twin", birthday: "1990-06-15" },
        { name: "Younger Twin", birthday: "2000-06-15" },
      ];

      const result = organizeIntoCalendarData(people, 2024);

      // Both should be on the same day of week
      const dayOfWeek = getDayOfWeek("1990-06-15", 2024);
      expect(result[dayOfWeek]).toHaveLength(2);

      // Should be sorted by age (younger first)
      expect(result[dayOfWeek][0].name).toBe("Younger Twin");
      expect(result[dayOfWeek][0].age).toBe(24);
      expect(result[dayOfWeek][1].name).toBe("Older Twin");
      expect(result[dayOfWeek][1].age).toBe(34);
    });

    it("should handle all people on same day", () => {
      const people = [
        { name: "Person1", birthday: "1990-01-01" },
        { name: "Person2", birthday: "1985-01-01" },
        { name: "Person3", birthday: "2000-01-01" },
      ];

      const result = organizeIntoCalendarData(people, 2024);

      const dayOfWeek = getDayOfWeek("1990-01-01", 2024);

      // All should be on the same day
      expect(result[dayOfWeek]).toHaveLength(3);

      // Other days should be empty
      for (let i = 0; i < 7; i++) {
        if (i !== dayOfWeek) {
          expect(result[i]).toHaveLength(0);
        }
      }

      // Should be sorted by age and have different colors
      expect(result[dayOfWeek][0].age).toBe(24); // Youngest
      expect(result[dayOfWeek][1].age).toBe(34);
      expect(result[dayOfWeek][2].age).toBe(39); // Oldest

      expect(result[dayOfWeek][0].color).toBe("#545D79");
      expect(result[dayOfWeek][1].color).toBe("#8AB721");
      expect(result[dayOfWeek][2].color).toBe("#C77D99");
    });

    it("should handle people spread across all days", () => {
      const people = [
        { name: "Monday", birthday: "2024-01-01" }, // Monday
        { name: "Tuesday", birthday: "2024-01-02" }, // Tuesday
        { name: "Wednesday", birthday: "2024-01-03" }, // Wednesday
        { name: "Thursday", birthday: "2024-01-04" }, // Thursday
        { name: "Friday", birthday: "2024-01-05" }, // Friday
        { name: "Saturday", birthday: "2024-01-06" }, // Saturday
        { name: "Sunday", birthday: "2024-01-07" }, // Sunday
      ];

      const result = organizeIntoCalendarData(people, 2024);

      // Each day should have exactly one person
      for (let i = 0; i < 7; i++) {
        expect(result[i]).toHaveLength(1);
        expect(result[i][0].dayOfWeek).toBe(i);
        expect(result[i][0].color).toBe("#545D79"); // First color since only one person per day
      }
    });
  });

  describe("Data Processing Integration Tests", () => {
    it("should handle complete workflow with real-world data", () => {
      const people = [
        { name: "Tyrion Lannister", birthday: "1978-12-02" },
        { name: "Cersei Lannister", birthday: "1975-11-30" },
        { name: "Daenerys Targaryen", birthday: "1991-11-24" },
        { name: "Jon Snow", birthday: "1987-01-15" },
        { name: "Arya Stark", birthday: "1997-04-14" },
      ];

      const result = organizeIntoCalendarData(people, 2024);

      // Should have all 7 days
      expect(Object.keys(result)).toHaveLength(7);

      // Total people should be preserved
      const totalPeople = Object.values(result).reduce(
        (sum, dayPeople) => sum + dayPeople.length,
        0,
      );
      expect(totalPeople).toBe(5);

      // Each person should have all required properties
      Object.values(result).forEach((dayPeople) => {
        dayPeople.forEach((person: any) => {
          expect(person).toHaveProperty("name");
          expect(person).toHaveProperty("birthday");
          expect(person).toHaveProperty("age");
          expect(person).toHaveProperty("dayOfWeek");
          expect(person).toHaveProperty("color");

          expect(typeof person.name).toBe("string");
          expect(typeof person.birthday).toBe("string");
          expect(typeof person.age).toBe("number");
          expect(typeof person.dayOfWeek).toBe("number");
          expect(typeof person.color).toBe("string");

          expect(person.dayOfWeek).toBeGreaterThanOrEqual(0);
          expect(person.dayOfWeek).toBeLessThanOrEqual(6);
          expect(person.color).toMatch(/^#[0-9A-F]{6}$/i);
        });
      });

      // People within each day should be sorted by age
      Object.values(result).forEach((dayPeople) => {
        if (dayPeople.length > 1) {
          for (let i = 1; i < dayPeople.length; i++) {
            expect(dayPeople[i].age).toBeGreaterThanOrEqual(
              dayPeople[i - 1].age,
            );
          }
        }
      });
    });

    it("should handle edge cases and maintain data integrity", () => {
      const people = [
        { name: "Future Baby", birthday: "2030-01-01" }, // Future birth year
        { name: "Leap Year Baby", birthday: "2000-02-29" }, // Leap year
        { name: "New Year", birthday: "1990-01-01" }, // Year boundary
        { name: "Year End", birthday: "1990-12-31" }, // Year boundary
      ];

      const result = organizeIntoCalendarData(people, 2024);

      // Should handle negative ages
      const futureBaby = Object.values(result)
        .flat()
        .find((p) => p.name === "Future Baby");
      expect(futureBaby?.age).toBe(-6);

      // Should handle leap year correctly
      const leapBaby = Object.values(result)
        .flat()
        .find((p) => p.name === "Leap Year Baby");
      expect(leapBaby?.age).toBe(24);
      expect(leapBaby?.dayOfWeek).toBe(3); // Thursday in 2024

      // Should handle year boundaries
      const newYear = Object.values(result)
        .flat()
        .find((p) => p.name === "New Year");
      const yearEnd = Object.values(result)
        .flat()
        .find((p) => p.name === "Year End");
      expect(newYear?.age).toBe(34);
      expect(yearEnd?.age).toBe(34);
    });

    it("should maintain performance with larger datasets", () => {
      // Generate 100 people with random birthdays
      const people = Array.from({ length: 100 }, (_, i) => ({
        name: `Person ${i + 1}`,
        birthday: `${1950 + (i % 50)}-${String((i % 12) + 1).padStart(2, "0")}-${String((i % 28) + 1).padStart(2, "0")}`,
      }));

      const startTime = Date.now();
      const result = organizeIntoCalendarData(people, 2024);
      const endTime = Date.now();

      // Should complete quickly (less than 100ms for 100 people)
      expect(endTime - startTime).toBeLessThan(100);

      // Should have all 7 days
      expect(Object.keys(result)).toHaveLength(7);

      // Total people should be preserved
      const totalPeople = Object.values(result).reduce(
        (sum, dayPeople) => sum + dayPeople.length,
        0,
      );
      expect(totalPeople).toBe(100);

      // Each day should have people sorted by age
      Object.values(result).forEach((dayPeople) => {
        if (dayPeople.length > 1) {
          for (let i = 1; i < dayPeople.length; i++) {
            expect(dayPeople[i].age).toBeGreaterThanOrEqual(
              dayPeople[i - 1].age,
            );
          }
        }
      });
    });
  });
});
describe("calculateSquareSize", () => {
  it("should calculate optimal square size for small number of people", () => {
    // Container width 200px, 1 person
    expect(calculateSquareSize(200, 1)).toBe(80); // Max size limit

    // Container width 200px, 4 people (2x2 grid)
    expect(calculateSquareSize(200, 4)).toBe(80); // Max size limit

    // Container width 100px, 4 people (2x2 grid)
    // Available width: 100 - (2-1)*4 = 96px
    // Square size: 96/2 = 48px
    expect(calculateSquareSize(100, 4)).toBe(48);
  });

  it("should handle large number of people", () => {
    // Container width 200px, 16 people (4x4 grid)
    // Available width: 200 - (4-1)*4 = 188px
    // Square size: 188/4 = 47px
    expect(calculateSquareSize(200, 16)).toBe(47);

    // Container width 200px, 25 people (5x5 grid)
    // Available width: 200 - (5-1)*4 = 184px
    // Square size: 184/5 = 36px
    expect(calculateSquareSize(200, 25)).toBe(36);
  });

  it("should respect minimum size constraint", () => {
    // Very small container with many people
    expect(calculateSquareSize(50, 100)).toBe(20); // Min size limit
    expect(calculateSquareSize(10, 10)).toBe(20); // Min size limit
  });

  it("should respect maximum size constraint", () => {
    // Large container with few people
    expect(calculateSquareSize(1000, 1)).toBe(80); // Max size limit
    expect(calculateSquareSize(500, 2)).toBe(80); // Max size limit
  });

  it("should handle zero people", () => {
    expect(calculateSquareSize(200, 0)).toBe(20); // Min size
  });

  it("should handle custom gap, min, and max values", () => {
    // Custom gap of 8px instead of 4px
    // Container 100px, 4 people, gap 8px
    // Available width: 100 - (2-1)*8 = 92px
    // Square size: 92/2 = 46px
    expect(calculateSquareSize(100, 4, 8)).toBe(46);

    // Custom min size of 30px
    expect(calculateSquareSize(50, 100, 4, 30)).toBe(30);

    // Custom max size of 60px
    expect(calculateSquareSize(1000, 1, 4, 20, 60)).toBe(60);
  });

  it("should calculate grid layout correctly", () => {
    // 9 people should use 3x3 grid
    // Container 150px, gap 4px
    // Available width: 150 - (3-1)*4 = 142px
    // Square size: 142/3 = 47px
    expect(calculateSquareSize(150, 9)).toBe(47);

    // 10 people should use 4x3 grid (ceil(sqrt(10)) = 4)
    // Container 200px, gap 4px
    // Available width: 200 - (4-1)*4 = 188px
    // Square size: 188/4 = 47px
    expect(calculateSquareSize(200, 10)).toBe(47);
  });
});
