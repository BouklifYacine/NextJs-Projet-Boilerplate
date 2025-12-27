---
description: Animation & Micro-interactions (Framer Motion)
globs: "src/components/**/*.tsx"
---

# Animation Guidelines (Framer Motion)

**ALWAYS start by using the `sequential-thinking` MCP server to analyze the request. User "sequential-thinking" first.**

We build "Premier" feel applications. Animations must be smooth, purposeful, and performant.

## 1. Principles

- **Purposeful**: Don't animate for the sake of it. Animate to guide the user (e.g., origin of a modal, deletions).
- **Fast**: Transitions should be between 200ms and 400ms.
- **Springs**: Use `type: "spring"` for natural movement over linear tweens.

## 2. Standard Patterns

- **Page Transitions**: Use standard layout animations in routes.
- **Lists**: Use `<AnimatePresence>` for items entering/leaving a list.
- **Layout Id**: Use `layoutId` for magic-motion effects (e.g., active tab background sliding).
  ```tsx
  {
    active && <motion.div layoutId="active-tab" className="..." />;
  }
  ```

## 3. Performance

- **Will Change**: Use `will-change-transform` sparingly.
- **Lazy**: Lazy load heavy animations (Lottie) using `m` component from `framer-motion` (reduced bundle size) if possible.
