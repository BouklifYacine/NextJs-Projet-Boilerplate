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

// Mock router
vi.mock("@tanstack/react-router", () => ({
  useNavigate: () => vi.fn(),
}));

// Mock authClient - must be before imports that use it
const mockBanUser = vi.fn();
const mockUnbanUser = vi.fn();
const mockSetRole = vi.fn();
const mockRemoveUser = vi.fn();

vi.mock("@/lib/auth-client", () => ({
  authClient: {
    admin: {
      banUser: mockBanUser,
      unbanUser: mockUnbanUser,
      impersonateUser: vi.fn(),
      stopImpersonating: vi.fn(),
      setRole: mockSetRole,
      removeUser: mockRemoveUser,
    },
  },
}));

import toast from "react-hot-toast";
import { useBanUser } from "../hooks/use-ban-user";
import { useUnbanUser } from "../hooks/use-unban-user";
import { useSetUserRole } from "../hooks/use-set-role";
import { useRemoveUser } from "../hooks/use-remove-user";

/**
 * Helper to create a wrapper with QueryClient
 */
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

describe("Admin Hooks", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("useBanUser", () => {
    it("should call banUser with correct parameters", async () => {
      mockBanUser.mockResolvedValue({ data: undefined, error: null });

      const { result } = renderHook(() => useBanUser(), {
        wrapper: createWrapper(),
      });

      result.current.mutate({
        userId: "user-123",
        banReason: "Violation of terms",
        banExpiresIn: 86400,
      });

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      expect(mockBanUser).toHaveBeenCalledWith({
        userId: "user-123",
        banReason: "Violation of terms",
        banExpiresIn: 86400,
      });
      expect(toast.success).toHaveBeenCalledWith("User has been banned");
    });

    it("should show error toast when ban fails", async () => {
      mockBanUser.mockResolvedValue({
        data: null,
        error: { message: "Not authorized" },
      });

      const { result } = renderHook(() => useBanUser(), {
        wrapper: createWrapper(),
      });

      result.current.mutate({ userId: "user-123" });

      await waitFor(() => {
        expect(result.current.isError).toBe(true);
      });

      expect(toast.error).toHaveBeenCalledWith("Not authorized");
    });
  });

  describe("useUnbanUser", () => {
    it("should call unbanUser with correct userId", async () => {
      mockUnbanUser.mockResolvedValue({ data: undefined, error: null });

      const { result } = renderHook(() => useUnbanUser(), {
        wrapper: createWrapper(),
      });

      result.current.mutate("user-123");

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      expect(mockUnbanUser).toHaveBeenCalledWith({ userId: "user-123" });
      expect(toast.success).toHaveBeenCalledWith("User has been unbanned");
    });
  });

  describe("useSetUserRole", () => {
    it("should call setRole with correct parameters", async () => {
      mockSetRole.mockResolvedValue({ data: undefined, error: null });

      const { result } = renderHook(() => useSetUserRole(), {
        wrapper: createWrapper(),
      });

      result.current.mutate({ userId: "user-123", role: "Admin" });

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      expect(mockSetRole).toHaveBeenCalledWith({
        userId: "user-123",
        role: "Admin",
      });
      expect(toast.success).toHaveBeenCalledWith("User role updated to Admin");
    });
  });

  describe("useRemoveUser", () => {
    it("should call removeUser with correct userId", async () => {
      mockRemoveUser.mockResolvedValue({ data: undefined, error: null });

      const { result } = renderHook(() => useRemoveUser(), {
        wrapper: createWrapper(),
      });

      result.current.mutate("user-123");

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      expect(mockRemoveUser).toHaveBeenCalledWith({ userId: "user-123" });
      expect(toast.success).toHaveBeenCalledWith("User has been removed");
    });

    it("should show error toast when removal fails", async () => {
      mockRemoveUser.mockResolvedValue({
        data: null,
        error: { message: "Cannot delete yourself" },
      });

      const { result } = renderHook(() => useRemoveUser(), {
        wrapper: createWrapper(),
      });

      result.current.mutate("user-123");

      await waitFor(() => {
        expect(result.current.isError).toBe(true);
      });

      expect(toast.error).toHaveBeenCalledWith("Cannot delete yourself");
    });
  });
});
