---
description: GitHub Workflow & MCP Integration
globs: ".github/**", "**/*"
---

# GitHub & Source Control Rules

**ALWAYS start by using the `sequential-thinking` MCP server to analyze the request. User "sequential-thinking" first.**

We reference the GitHub MCP to automate and verify our git workflow.

## 1. GitHub MCP Usage

- **Context**: Before answering a question about "Open PRs" or "Issues", ALWAYS query the GitHub MCP first to get live data.
- **Actions**: Use the GitHub MCP to:
  - `create_issue`: When a bug is confirmed.
  - `create_pull_request`: When a task is completed.
  - `search_repositories`: To find relevant code examples in the existing repo history.

## 2. Commit Convention (Conventional Commits)

- **Format**: `type(scope): description`
- **Types**:
  - `feat`: New feature
  - `fix`: Bug fix
  - `refactor`: Code change that neither fixes a bug nor adds a feature
  - `chore`: Build process, dependencies
  - `docs`: Documentation only
  - `style`: Formatting, missing semi colons, etc
- **Example**: `feat(auth): implement better-auth login flow`

## 3. Pull Request Protocol

- **Title**: Must follow Conventional Commits.
- **Description**: Must include "What", "Why", and "Testing Video" (reference Browser MCP usage).
- **Checks**: All CI checks (Type Check, Lint, Build) must pass before requesting review.
