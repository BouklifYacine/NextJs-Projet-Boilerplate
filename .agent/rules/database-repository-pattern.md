---
trigger: always_on
---

---

description: Implementation of the Repository Pattern for the Data Access Layer.
globs: src/features/\*_/repositories/_.ts

---

# Data Persistence: Repository Pattern

To ensure high testability and separation of concerns, do not call Prisma directly from Services or Server Functions.

## 1. The Repository Layer

- Create a `repositories/` folder inside each feature.
- Each repository is responsible for a single entity (e.g., `UserRepository`, `OrderRepository`).
- Define an **Interface** for each repository to allow for easy mocking during unit tests.

## 2. Abstraction

- Services must interact with Repositories, not the Database directly.
- **Example Flow**: `Component` -> `Hook` -> `Server Function` -> `Service` -> `Repository` -> `Prisma`.

## 3. Data Integrity

- Encapsulate complex Prisma queries (multiple joins, nested selects) inside repository methods.
- Keep repository methods "dumb": they should only handle CRUD operations and basic filtering, leaving business logic to the Services.
- Always use specific `select` blocks within repositories to prevent over-fetching.
