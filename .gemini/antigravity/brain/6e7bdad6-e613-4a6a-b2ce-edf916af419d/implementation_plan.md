# Implementation Plan: Hybrid Testing & Living Documentation

## Goal

Implement "Lead Dev" quality rules for a standardized **Product Map** (Living Documentation) and a **Hybrid Testing Strategy** (90% Unit + E2E) to ensure project robustness and visibility.

## User Review Required

> [!IMPORTANT]
> **Testing Cost**: Requiring 90% Unit Test coverage + E2E is high effort. The rules will mandate Vitest for all Logic/Server Functions, while keeping E2E for the final browser check.

## Proposed Changes

### 1. New Rule: Product Documentation

#### [NEW] [.agent/rules/20-documentation-product.md](file:///f:/Documents/GithubPersoRepo/NextJs-Projet-Boilerplate/.agent/rules/20-documentation-product.md)

- Defines the `FEATURES.md` structure.
- Mandates a "Product Map" approach (Epic > Feature > Status).
- Requires updating this map when a feature is `Done`.

### 2. Update Rule: Testing Strategy

#### [MODIFY] [.agent/rules/14-testing-strategy.md](file:///f:/Documents/GithubPersoRepo/NextJs-Projet-Boilerplate/.agent/rules/14-testing-strategy.md)

- **Hybrid Approach**:
  - **Unit Tests (Vitest)**: Mandatory for `server/`, `hooks/`, `utils/`. Target 90% coverage.
  - **E2E (Browser MCP)**: Mandatory for Critical Paths (Login, Checkout).
- **Tooling**: Explicitly mentions `vitest` command usage.

### 3. Documentation Scaffolding

#### [NEW] [FEATURES.md](file:///f:/Documents/GithubPersoRepo/NextJs-Projet-Boilerplate/FEATURES.md)

- Create the root "Product Map" file with the current known features (Auth, Dashboard).

### 4. Workflow Updates

#### [MODIFY] [.agent/workflows/scaffold-feature.md](file:///f:/Documents/GithubPersoRepo/NextJs-Projet-Boilerplate/.agent/workflows/scaffold-feature.md)

- Update workflow to include creating a `__tests__` folder.

## Verification

- **Manual Review**: Check the generated markdown files.
- **Workflow Test**: Simulate how the `scaffold` workflow would now ask to create tests.
