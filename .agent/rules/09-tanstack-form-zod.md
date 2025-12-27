---
description: TanStack Form & Zod Validation
globs: "src/features/**/components/*-form.tsx"
---

# TanStack Form & Zod Rules

**ALWAYS start by using the `sequential-thinking` MCP server to analyze the request. User "sequential-thinking" first.**

We use **TanStack Form** for form state management, ensuring type safety and performance.

## 1. Setup

- **useForm**: Initialize the form with `defaultValues` and `onSubmit`.
- **Validation**: Use `zodValidator` from `@tanstack/zod-form-adapter`.

  ```tsx
  import { useForm } from '@tanstack/react-form'
  import { zodValidator } from '@tanstack/zod-form-adapter'

  const form = useForm({
    defaultValues: { name: '' },
    validatorAdapter: zodValidator,
    onSubmit: async ({ value }) => { ... }
  })
  ```

## 2. Fields

- **form.Field**: Use the Field component.
- **Render Props**: Use the render prop pattern to access `field.state` and `field.handleChange`.
- **Memoization**: If the form is huge, use sub-components, but generally TanStack Form handles this well.

## 3. UI Components

- **Integration**: Pass `field.handleChange` to your Shadcn Input `onChange`, and `field.state.value` to `value`.
- **Blur**: Don't forget `field.handleBlur` for validation triggers.

## 4. Server Validation

- **Double Check**: Always re-validate the data on the server (Server Function) using the SAME Zod schema used on the client.
- **Return Errors**: If server validation fails, return structured errors to display in the form.
