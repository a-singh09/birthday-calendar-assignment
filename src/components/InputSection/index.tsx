/**
 * InputSection component for JSON input and year selection
 */

import type { InputSectionProps } from "../../types";

export function InputSection({
  jsonInput,
  selectedYear,
  jsonError,
  availableYears,
  onJsonChange,
  onYearChange,
}: InputSectionProps) {
  return (
    <div className="input-section">
      <div className="input-group">
        <label htmlFor="json-input" className="input-label">
          Birthday Data (JSON)
        </label>
        <textarea
          id="json-input"
          className={`json-textarea ${jsonError ? "error" : ""}`}
          value={jsonInput}
          onChange={(e) => onJsonChange(e.target.value)}
          placeholder='[{"name": "Tyrion Lannister", "birthday": "1978-12-02"}]'
          rows={8}
        />
        {jsonError && (
          <div className="error-message" role="alert">
            {jsonError}
          </div>
        )}
      </div>

      <div className="input-group">
        <label htmlFor="year-select" className="input-label">
          Select Year
        </label>
        <select
          id="year-select"
          className="year-dropdown"
          value={selectedYear}
          onChange={(e) => onYearChange(parseInt(e.target.value, 10))}
        >
          {availableYears.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
