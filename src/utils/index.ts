/**
 * Utility functions for the Birthday Calendar application
 */

import type {
  ParseResult,
  Person,
  ProcessedPerson,
  CalendarData,
} from "../types";
import { COLOR_PALETTE } from "../constants";

/**
 * Calculate day of week for a given birthday in a specific year
 * @param birthday - Date string in YYYY-MM-DD format
 * @param year - The year to calculate the day of week for
 * @returns Day of week (0=Monday, 1=Tuesday, ..., 6=Sunday)
 */
export function getDayOfWeek(birthday: string, year: number): number {
  const [, month, day] = birthday.split("-").map(Number);
  const date = new Date(year, month - 1, day);
  // Convert JavaScript's Sunday=0 to Monday=0 mapping
  return (date.getDay() + 6) % 7;
}

/**
 * Calculate age in a specific year based on birthday
 * @param birthday - Date string in YYYY-MM-DD format
 * @param year - The year to calculate age for
 * @returns Age in the specified year
 */
export function calculateAge(birthday: string, year: number): number {
  const birthYear = parseInt(birthday.split("-")[0]);
  return year - birthYear;
}

/**
 * Validate if a date string is in YYYY-MM-DD format and represents a valid date
 * @param dateString - Date string to validate
 * @returns true if valid, false otherwise
 */
export function isValidDateFormat(dateString: string): boolean {
  // Check format with regex
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateRegex.test(dateString)) {
    return false;
  }

  // Parse and validate the actual date
  const [year, month, day] = dateString.split("-").map(Number);

  // Basic range checks
  if (year < 1000 || year > 9999) return false;
  if (month < 1 || month > 12) return false;
  if (day < 1 || day > 31) return false;

  // Create date and check if it's valid (handles leap years, month lengths, etc.)
  const date = new Date(year, month - 1, day);
  return (
    date.getFullYear() === year &&
    date.getMonth() === month - 1 &&
    date.getDate() === day
  );
}

/**
 * Check if a given year is a leap year
 * @param year - Year to check
 * @returns true if leap year, false otherwise
 */
export function isLeapYear(year: number): boolean {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

/**
 * Get the number of days in a specific month of a year
 * @param year - Year
 * @param month - Month (1-12)
 * @returns Number of days in the month
 */
export function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month, 0).getDate();
}

/**
 * Validate a person object has required fields and valid data
 * @param obj - Object to validate as Person
 * @returns Validation result with error message if invalid
 */
export function validatePerson(
  obj: any,
): ParseResult<{ name: string; birthday: string }> {
  // Check if obj is an object
  if (!obj || typeof obj !== "object") {
    return {
      success: false,
      error: "Person must be an object",
    };
  }

  // Check required fields exist
  if (!obj.hasOwnProperty("name")) {
    return {
      success: false,
      error: 'Person must have a "name" field',
    };
  }

  if (!obj.hasOwnProperty("birthday")) {
    return {
      success: false,
      error: 'Person must have a "birthday" field',
    };
  }

  // Check field types
  if (typeof obj.name !== "string") {
    return {
      success: false,
      error: "Person name must be a string",
    };
  }

  if (typeof obj.birthday !== "string") {
    return {
      success: false,
      error: "Person birthday must be a string",
    };
  }

  // Check name is not empty
  if (obj.name.trim().length === 0) {
    return {
      success: false,
      error: "Person name cannot be empty",
    };
  }

  // Validate birthday format
  if (!isValidDateFormat(obj.birthday)) {
    return {
      success: false,
      error: `Invalid birthday format "${obj.birthday}". Expected YYYY-MM-DD format with valid date`,
    };
  }

  return {
    success: true,
    data: {
      name: obj.name.trim(),
      birthday: obj.birthday,
    },
  };
}

/**
 * Parse and validate JSON string containing array of people
 * @param jsonString - JSON string to parse
 * @returns Parse result with array of Person objects or error message
 */
export function parsePersonsJson(
  jsonString: string,
): ParseResult<Array<{ name: string; birthday: string }>> {
  // Handle empty or whitespace-only input
  if (!jsonString || jsonString.trim().length === 0) {
    return {
      success: false,
      error: "JSON input cannot be empty",
    };
  }

  let parsed: any;

  // Try to parse JSON
  try {
    parsed = JSON.parse(jsonString);
  } catch (error) {
    return {
      success: false,
      error: `Invalid JSON format: ${error instanceof Error ? error.message : "Unknown parsing error"}`,
    };
  }

  // Check if parsed result is an array
  if (!Array.isArray(parsed)) {
    return {
      success: false,
      error: "JSON must contain an array of people",
    };
  }

  // Check if array is empty
  if (parsed.length === 0) {
    return {
      success: false,
      error: "JSON array cannot be empty",
    };
  }

  // Validate each person in the array
  const validatedPeople: Array<{ name: string; birthday: string }> = [];

  for (let i = 0; i < parsed.length; i++) {
    const personResult = validatePerson(parsed[i]);

    if (!personResult.success) {
      return {
        success: false,
        error: `Person at index ${i}: ${personResult.error}`,
      };
    }

    if (personResult.data) {
      validatedPeople.push(personResult.data);
    }
  }

  // Check for duplicate names
  const names = validatedPeople.map((p) => p.name.toLowerCase());
  const duplicateNames = names.filter(
    (name, index) => names.indexOf(name) !== index,
  );

  if (duplicateNames.length > 0) {
    return {
      success: false,
      error: `Duplicate names found: ${[...new Set(duplicateNames)].join(", ")}`,
    };
  }

  return {
    success: true,
    data: validatedPeople,
  };
}

/**
 * Transform a Person array into ProcessedPerson array with age, day of week, and color
 * @param people - Array of Person objects
 * @param year - The year to calculate ages and day of week for
 * @returns Array of ProcessedPerson objects
 */
export function processPersons(
  people: Person[],
  year: number,
): ProcessedPerson[] {
  return people.map((person, index) => ({
    ...person,
    age: calculateAge(person.birthday, year),
    dayOfWeek: getDayOfWeek(person.birthday, year),
    color: COLOR_PALETTE[index % COLOR_PALETTE.length],
  }));
}

/**
 * Sort people by age within each day (youngest first)
 * @param people - Array of ProcessedPerson objects
 * @returns Array sorted by age (youngest first)
 */
export function sortPeopleByAge(people: ProcessedPerson[]): ProcessedPerson[] {
  return [...people].sort((a, b) => a.age - b.age);
}

/**
 * Assign colors to people within each day of the week
 * Colors are assigned cyclically from the color palette within each day
 * @param peopleByDay - Object mapping day index to array of people
 * @returns Object with people having updated colors
 */
export function assignColorsWithinDays(peopleByDay: {
  [dayIndex: number]: ProcessedPerson[];
}): { [dayIndex: number]: ProcessedPerson[] } {
  const result: { [dayIndex: number]: ProcessedPerson[] } = {};

  Object.keys(peopleByDay).forEach((dayKey) => {
    const dayIndex = parseInt(dayKey);
    const people = peopleByDay[dayIndex];

    result[dayIndex] = people.map((person, index) => ({
      ...person,
      color: COLOR_PALETTE[index % COLOR_PALETTE.length],
    }));
  });

  return result;
}

/**
 * Organize processed people into CalendarData structure
 * Groups people by day of week, sorts by age within each day, and assigns colors
 * @param people - Array of Person objects
 * @param year - The year to calculate ages and day of week for
 * @returns CalendarData object with people organized by day of week
 */
export function organizeIntoCalendarData(
  people: Person[],
  year: number,
): CalendarData {
  // First, process all people to get age and day of week
  const processedPeople = processPersons(people, year);

  // Group people by day of week
  const peopleByDay: { [dayIndex: number]: ProcessedPerson[] } = {};

  // Initialize all days as empty arrays
  for (let i = 0; i < 7; i++) {
    peopleByDay[i] = [];
  }

  // Group people by their day of week
  processedPeople.forEach((person) => {
    peopleByDay[person.dayOfWeek].push(person);
  });

  // Sort people by age within each day and assign colors
  Object.keys(peopleByDay).forEach((dayKey) => {
    const dayIndex = parseInt(dayKey);
    if (peopleByDay[dayIndex].length > 0) {
      // Sort by age (youngest first)
      peopleByDay[dayIndex] = sortPeopleByAge(peopleByDay[dayIndex]);
    }
  });

  // Assign colors within each day
  const calendarData = assignColorsWithinDays(peopleByDay);

  return calendarData;
}
