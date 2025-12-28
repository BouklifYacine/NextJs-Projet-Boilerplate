---
trigger: always_on
---

# UI Design System Rules

**ALWAYS start by using the `sequential-thinking` MCP server to analyze the request. User "sequential-thinking" first.**

We use **Shadcn/UI** (Radix Primitives) and **Tailwind CSS**.

## 1. Component Usage

- **Primitives**: Import clean primitives from `src/components/ui`.
- **Composition**: Don't alter the core logic of Shadcn components. Wrap them if you need custom behavior.
- **Imports**: `import { Button } from "@/components/ui/button"`

## 2. Tailwind CSS

- **Utility First**: Write classes directly in `className`.
- **cn() Utility**: Use the `cn()` helper (clsx + tailwind-merge) for conditional classes.
  ```tsx
  <div className={cn("bg-red-500", isActive && "bg-green-500")} />
  ```
- **Spacing tokens**: Use `p-4`, `m-2`, `gap-2` (consistency). Avoid arbitrary values like `p-[13px]`.
- **Colors**: Use semantic colors defined in `globals.css` (CSS variables) like `bg-primary`, `text-destructive`. Avoid hardcoded hex colors.

## 3. Responsive Design

- **Mobile First**: Default styles are for mobile. Use `md:`, `lg:` for larger screens.
  ```tsx
  <div className="flex flex-col md:flex-row">...</div>
  ```

## 4. Accessibility (A11y)

- **Radix**: Shadcn uses Radix, which handles most ARIA attributes. Don't break it.
- **Keyboard Nav**: Ensure all interactive elements are focusable.
- **Screen Readers**: Add `sr-only` spans for icon-only buttons.
