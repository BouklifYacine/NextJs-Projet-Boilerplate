---
description: How to create a TanStack Start server function with proper validation
---

# TanStack Server Function Workflow

// turbo-all

## 1. Create Zod Schema in `schemas/`

Create or update a schema file in the feature's `schemas/` folder:

```typescript
// features/<feature>/schemas/<feature>-schemas.ts
import { z } from "zod";

export const myActionSchema = z.object({
  id: z.string().min(1),
  // Add more fields as needed
});

export type MyActionInput = z.infer<typeof myActionSchema>;
```

## 2. Create Server Function in `server/`

```typescript
// features/<feature>/server/<feature>.server.ts
import { createServerFn } from "@tanstack/react-start";
import { zodValidator } from "@tanstack/zod-adapter";
import { myActionSchema } from "../schemas/<feature>-schemas";

export const myAction = createServerFn({ method: "POST" })
  .inputValidator(zodValidator(myActionSchema))
  .handler(async ({ data }) => {
    // data is now typed and validated
    return { success: true };
  });
```

## 3. Create Mutation Hook (if needed)

Use `useAdminMutations` pattern for consolidated mutations:

```typescript
// features/<feature>/hooks/use-<feature>-mutations.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { myAction } from "../server/<feature>.server";
import type { MyActionInput } from "../schemas/<feature>-schemas";
import { featureKeys } from "./feature-keys";

export function useFeatureMutations() {
  const qc = useQueryClient();
  const invalidate = () =>
    qc.invalidateQueries({ queryKey: featureKeys.all() });

  return {
    myAction: useMutation({
      mutationFn: (input: MyActionInput) => myAction({ data: input }),
      onSuccess: () => toast.success("Action réussie"),
      onError: (e: Error) => toast.error(e.message),
      onSettled: invalidate, // Always refetch after mutation
    }),
  };
}
```

## Key Patterns

1. **zodValidator**: Use `@tanstack/zod-adapter` instead of manual `(d: any) => schema.parse(d)`
2. **onSettled**: Always invalidate queries in `onSettled` (fires on both success AND error)
3. **Consolidated hooks**: Group related mutations in one hook
4. **Type inference**: Use `z.infer<typeof schema>` for types
