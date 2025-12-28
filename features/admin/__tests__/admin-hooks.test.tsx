import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { type ReactNode } from "react";

// Mock react-hot-toast
vi.mock("react-hot-toast", () => ({
  default: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

// Mock server functions
const mockBanUser = vi.fn();
const mockUnbanUser = vi.fn();
const mockSetUserRole = vi.fn();
const mockRemoveUser = vi.fn();

vi.mock("../server/admin.server", () => ({
  banUser: (args: unknown) => mockBanUser(args),
  unbanUser: (args: unknown) => mockUnbanUser(args),
  setUserRole: (args: unknown) => mockSetUserRole(args),
  removeUser: (args: unknown) => mockRemoveUser(args),
}));

import toast from "react-hot-toast";
import { useAdminMutations } from "../hooks/use-admin-mutations";

function createWrapper() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  });

  return function Wrapper({ children }: { children: ReactNode }) {
    return (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );
  };
}

describe("Admin Mutations Hook", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("banUser", () => {
    it("should call banUser with correct parameters", async () => {
      mockBanUser.mockResolvedValue({ success: true });

      const { result } = renderHook(() => useAdminMutations(), {
        wrapper: createWrapper(),
      });

      result.current.banUser.mutate({
        userId: "user-123",
        banReason: "Violation of terms",
        banExpiresIn: 86400,
      });

      await waitFor(() => {
        expect(result.current.banUser.isSuccess).toBe(true);
      });

      expect(mockBanUser).toHaveBeenCalledWith({
        data: {
          userId: "user-123",
          banReason: "Violation of terms",
          banExpiresIn: 86400,
        },
      });
      expect(toast.success).toHaveBeenCalled();
    });
  });

  describe("unbanUser", () => {
    it("should call unbanUser with correct userId", async () => {
      mockUnbanUser.mockResolvedValue({ success: true });

      const { result } = renderHook(() => useAdminMutations(), {
        wrapper: createWrapper(),
      });

      result.current.unbanUser.mutate("user-123");

      await waitFor(() => {
        expect(result.current.unbanUser.isSuccess).toBe(true);
      });

      expect(mockUnbanUser).toHaveBeenCalledWith({
        data: { userId: "user-123" },
      });
      expect(toast.success).toHaveBeenCalled();
    });
  });

  describe("setRole", () => {
    it("should call setRole with correct parameters", async () => {
      mockSetUserRole.mockResolvedValue({ success: true });

      const { result } = renderHook(() => useAdminMutations(), {
        wrapper: createWrapper(),
      });

      result.current.setRole.mutate({ userId: "user-123", role: "Admin" });

      await waitFor(() => {
        expect(result.current.setRole.isSuccess).toBe(true);
      });

      expect(mockSetUserRole).toHaveBeenCalledWith({
        data: { userId: "user-123", role: "Admin" },
      });
      expect(toast.success).toHaveBeenCalled();
    });
  });

  describe("removeUser", () => {
    it("should call removeUser with correct userId", async () => {
      mockRemoveUser.mockResolvedValue({ success: true });

      const { result } = renderHook(() => useAdminMutations(), {
        wrapper: createWrapper(),
      });

      result.current.removeUser.mutate("user-123");

      await waitFor(() => {
        expect(result.current.removeUser.isSuccess).toBe(true);
      });

      expect(mockRemoveUser).toHaveBeenCalledWith({
        data: { userId: "user-123" },
      });
      expect(toast.success).toHaveBeenCalled();
    });
  });
});
