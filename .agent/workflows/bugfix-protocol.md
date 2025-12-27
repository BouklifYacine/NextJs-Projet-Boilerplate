---
description: Systematic bug fixing protocol
---

# Bug Fix Workflow

1.  **Analysis**:
    - Read the error message or user description.
    - **Search**: Use `grep_search` to find the error text or relevant code specific to the issue.
2.  **Reproduction Plan**:
    - Formulate a hypothesis: "I believe X is failing because of Y".
    - (Optional) Create a reproduction script or test case if the bug is complex.
3.  **Fix Implementation**:
    - Apply the fix following the `13-bug-fixing-protocol.md` rule (Minimal Change, Root Cause).
4.  **Verification**:
    - **// turbo**
    - Run the necessary verify command or ask to run the `/verify` workflow to confirm the fix works in the browser.
5.  **Git Action**:
    - Use `github.create_issue` if this is a large bug needing tracking, OR
    - Commit the fix with a conventional commit message `fix(scope): ...`.
