"use client";

import { useState, useCallback, useMemo } from "react";
import type { Person, CalendarData } from "../types";
import { parsePersonsJson, organizeIntoCalendarData } from "../utils";
import { CURRENT_YEAR, MIN_YEAR } from "../constants";
import { InputSection } from "../components/InputSection";
import { CalendarSection } from "../components/CalendarSection";

export default function BirthdayCalendar() {
  // Initialize state with default values
  const [people, setPeople] = useState<Person[]>([]);
  const [selectedYear, setSelectedYear] = useState<number>(CURRENT_YEAR);
  const [jsonInput, setJsonInput] = useState<string>("");
  const [jsonError, setJsonError] = useState<string | null>(null);

  // Generate available years array
  const availableYears = useMemo(() => {
    const years: number[] = [];
    for (let year = CURRENT_YEAR; year >= MIN_YEAR; year--) {
      years.push(year);
    }
    return years;
  }, []);

  // Calculate calendar data based on current people and selected year
  const calendarData: CalendarData = useMemo(() => {
    if (people.length === 0) {
      // Return empty calendar data for all days
      const emptyCalendar: CalendarData = {};
      for (let i = 0; i < 7; i++) {
        emptyCalendar[i] = [];
      }
      return emptyCalendar;
    }

    return organizeIntoCalendarData(people, selectedYear);
  }, [people, selectedYear]);

  // Handle JSON input changes with validation
  const handleJsonChange = useCallback((json: string) => {
    setJsonInput(json);

    // Clear previous error
    setJsonError(null);

    // If input is empty, clear people and return
    if (!json.trim()) {
      setPeople([]);
      return;
    }

    // Parse and validate JSON
    const parseResult = parsePersonsJson(json);

    if (parseResult.success && parseResult.data) {
      // Successfully parsed - update people
      setPeople(parseResult.data);
      setJsonError(null);
    } else {
      // Parse failed - set error and keep previous people
      setJsonError(parseResult.error || "Unknown parsing error");
    }
  }, []);

  // Handle year selection changes
  const handleYearChange = useCallback((year: number) => {
    setSelectedYear(year);
    // Calendar data will be recalculated automatically via useMemo
  }, []);

  return (
    <div className="birthday-calendar-app">
      <header>
        <h1>Birthday Calendar</h1>
        <p>
          Enter birthday data in JSON format and select a year to see when
          birthdays fall on each day of the week.
        </p>
      </header>

      <main>
        <InputSection
          jsonInput={jsonInput}
          selectedYear={selectedYear}
          jsonError={jsonError}
          availableYears={availableYears}
          onJsonChange={handleJsonChange}
          onYearChange={handleYearChange}
        />

        <CalendarSection calendarData={calendarData} />
      </main>
    </div>
  );
}
