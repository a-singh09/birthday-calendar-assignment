/**
 * Utility functions for the Birthday Calendar application
 */

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
