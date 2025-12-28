---
description: Verify the current feature using Browser MCP
---

# Feature Verification Workflow

1.  **Run Unit Tests**:
    - Execute `vitest run src/features/<feature-name>`.
    - If tests fail, STOP. Fix the logic first.
2.  **Check Environment**:
    - Ensure the dev server is running (`bun run dev`). If not, ask the user to start it.
3.  **Browser Interaction (Browser MCP)**:
    - Use `browser_navigate` to go to the page relevant to the feature.
    - **Take a Screenshot** of the initial state.
    - **Interact**:
      - Fill out forms (if any).
      - Click primary action buttons.
      - Check for success toasts or redirects.
    - **Take a Final Screenshot** of the success state.
4.  **Report**:
    - Summarize the specific actions taken.
    - Confirm if the feature works as expected ("Happy Path").
    - Report any visual glitches or console errors found.
