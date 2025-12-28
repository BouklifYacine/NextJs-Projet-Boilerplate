---
description: Scaffolds a new feature with the correct directory structure
---

# Feature Scaffolding Workflow

1.  **Analyze the Request**: Identify the feature name (e.g., `user-profile`, `billing`).
2.  **Product Map Update**:
    - Add the new feature to `FEATURES.md` with status `🟡 In Progress`.
3.  **Create Directories**:
    Run a command to create the following structure under `src/features/<feature-name>`:
    - `components/`
    - `hooks/`
    - `server/`
    - `services/`
    - `schemas/`
    - `types/`
    - `utils/`
    - `tests/` <-- New Test Folder
4.  **Create Base Files**:
    - `schemas/<feature-name>.schema.ts`: Create a basic Zod schema export.
    - `types/index.ts`: Export types inferred from the schema.
    - `server/<feature-name>.fn.ts`: Server Function.
    - `tests/<feature-name>.fn.test.ts`: Skeleton Vitest spec.
5.  **Confirmation**: List the created files and ask the user what specific logic to implement first.
