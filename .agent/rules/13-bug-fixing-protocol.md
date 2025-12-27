---
description: Protocol for fixing bugs systematically
globs: "**/*"
---

# Bug Fixing Protocol

**ALWAYS start by using the `sequential-thinking` MCP server to analyze the request. User "sequential-thinking" first.**

## 1. Reproduction

- **Identify**: Ask for the exact error message or behavior.
- **Locate**: Find the file causing the issue (use `grep` or file search).
- **Understand**: Don't guess. Read the surrounding code to understand the _intended_ logic vs _actual_ logic.

## 2. Solution

- **Root Cause**: Fix the root cause, not just the symptom (e.g., don't just add `?` to silence null errors if the value should never be null).
- **Minimal Change**: Apply the smallest possible fix to avoid regression.

## 3. Verification

- **Test**: Verify the fix works.
- **Regression**: ensure no other unrelated parts are broken (e.g., TS check).
