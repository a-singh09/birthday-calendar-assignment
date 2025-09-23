/**
 * Core type definitions for the Birthday Calendar application
 */

export interface Person {
  name: string;
  birthday: string; // YYYY-MM-DD format
}

export interface ProcessedPerson extends Person {
  age: number;
  dayOfWeek: number; // 0-6 (Monday-Sunday)
  color: string;
}

export interface CalendarData {
  [dayIndex: number]: ProcessedPerson[];
}

export interface AppState {
  people: Person[];
  selectedYear: number;
  calendarData: CalendarData;
  jsonInput: string;
  jsonError: string | null;
}

// Component prop interfaces
export interface InputSectionProps {
  jsonInput: string;
  selectedYear: number;
  jsonError: string | null;
  availableYears: number[];
  onJsonChange: (json: string) => void;
  onYearChange: (year: number) => void;
}

export interface CalendarSectionProps {
  calendarData: CalendarData;
}

export interface DayColumnProps {
  dayName: string;
  people: ProcessedPerson[];
  isEmpty: boolean;
}

export interface PersonSquareProps {
  person: ProcessedPerson;
  size: number; // calculated based on container and number of people
}

// Utility types
export interface ParseResult<T> {
  success: boolean;
  data?: T;
  error?: string;
}
