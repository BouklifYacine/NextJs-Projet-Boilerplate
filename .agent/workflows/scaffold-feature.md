---
description: Scaffolds a new feature with the correct directory structure
---

# Feature Scaffolding Workflow

1.  **Analyze the Request**: Identify the feature name (e.g., `user-profile`, `billing`).
2.  **Create Directories**:
    Run a command to create the following structure under `src/features/<feature-name>`:
    - `components/`
    - `hooks/`
    - `server/`
    - `schemas/`
    - `types/`
    - `utils/`
3.  **Create Base Files**:
    - `schemas/<feature-name>.schema.ts`: Create a basic Zod schema export.
    - `types/index.ts`: Export types inferred from the schema.
    - `server/<feature-name>.fn.ts`: Create a placeholder Server Function using `createServerFn`.
4.  **Confirmation**: List the created files and ask the user what specific logic to implement first.
