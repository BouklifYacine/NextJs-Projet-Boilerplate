---
trigger: always_on
---

---

description: Guidelines for date and time manipulation using Day.js.
globs: \*_/_.{ts,tsx}

---

# Date & Time Engineering (Day.js)

The native JavaScript `Date` object is forbidden for logic and formatting. Use **Day.js** for all time-related operations.

## 1. Consistency & Immutability

- Always wrap dates immediately: `const d = dayjs(input)`.
- Use Day.js's immutable methods (`.add()`, `.startOf()`) to avoid side effects.

## 2. Formatting & Localization

- Define a central constants file for date formats (e.g., `DATE_FORMAT_DISPLAY = "DD/MM/YYYY"`).
- Use the `.format()` method exclusively for UI display.
- Store and transmit dates in **ISO-8601** format.

## 3. Plugins

- Import necessary plugins (e.g., `relativeTime`, `utc`, `timezone`) only in a central configuration file (`src/lib/dayjs.ts`) to keep the bundle small.
