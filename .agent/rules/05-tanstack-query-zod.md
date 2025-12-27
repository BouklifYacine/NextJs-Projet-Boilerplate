---
description: TanStack Query & Zod Data Handling
globs: "src/**/hooks/use-*.ts", "src/**/*.tsx"
---

# TanStack Query & Zod Guidelines

**ALWAYS start by using the `sequential-thinking` MCP server to analyze the request. User "sequential-thinking" first.**

We use TanStack Query for async state management and Zod for schema validation.

## 1. Query Keys

- **Query Key Factories**: NEVER hardcode query keys strings. Use a factory pattern.
- **Structure**: `[feature, entity, action, params]`.
  ```ts
  export const todoKeys = {
    all: ["todos"] as const,
    lists: () => [...todoKeys.all, "list"] as const,
    list: (filters: string) => [...todoKeys.lists(), { filters }] as const,
    details: () => [...todoKeys.all, "detail"] as const,
    detail: (id: number) => [...todoKeys.details(), id] as const,
  };
  ```

## 2. Queries (Reading Data)

- **useQuery**: Use for fetching data.
- **staleTime**: Set a reasonable `staleTime` (e.g., 5 mins) to avoid excessive fetching.
- **Suspense**: Use `useSuspenseQuery` if you want to leverage React Suspense boundaries (recommended with TanStack Start).

## 3. Mutations (Optimistic UI & Feedback)

- **Lifecycle**: You MUST implement `onMutate`, `onError`, `onSettled`, and `onSuccess`.
- **Toast**: Use `react-hot-toast` for feedback.
- **Optimistic Updates**: Update the cache in `onMutate` and rollback in `onError`.

### Example Pattern

```tsx
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export function useDeleteItems() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (ids: string[]) => {
      // Call Server Function / Action
      const response = await deleteItems({ data: ids });
      if (!response.success) throw new Error("Delete failed");
      return response;
    },
    // 1. Optimistic Update
    onMutate: async (ids) => {
      await queryClient.cancelQueries({ queryKey: ["items"] });
      const previousData = queryClient.getQueryData(["items"]);

      // Optimistically remove items
      if (previousData) {
        queryClient.setQueryData(["items"], (old: any) => ({
          ...old,
          data: old.data.filter((item) => !ids.includes(item.id)),
        }));
      }

      return { previousData };
    },
    // 2. Success Feedback
    onSuccess: (data, ids) => {
      toast.success(`${ids.length} item(s) deleted`);
    },
    // 3. Rollback on Error
    onError: (error, vars, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(["items"], context.previousData);
      }
      toast.error("Error deleting items");
    },
    // 4. Always Refetch
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["items"] });
    },
  });
}
```

## 4. Zod Validation

- **Parse Responses**: Trust nothing. Validate Server Function responses with Zod if complex.
- **Form Schemas**: UI Forms (React Hook Form / TanStack Form) MUST use Zod schemas defined in `schemas/`.
- **Infer Types**: Use `z.infer<typeof schema>` to generate TS types. Don't manually duplicate types.
