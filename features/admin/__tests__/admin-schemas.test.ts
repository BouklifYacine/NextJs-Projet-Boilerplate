import { describe, it, expect } from "vitest";
import {
  banUserSchema,
  setRoleSchema,
  listUsersFilterSchema,
  createUserSchema,
} from "../schemas/admin-schemas";

describe("Admin Schemas Validation", () => {
  describe("banUserSchema", () => {
    it("should validate valid ban user input", () => {
      const validInput = {
        userId: "user-123",
        banReason: "Spamming",
        banExpiresIn: 86400,
      };

      const result = banUserSchema.safeParse(validInput);
      expect(result.success).toBe(true);
    });

    it("should accept ban without reason or expiry", () => {
      const minimalInput = {
        userId: "user-123",
      };

      const result = banUserSchema.safeParse(minimalInput);
      expect(result.success).toBe(true);
    });

    it("should reject empty userId", () => {
      const invalidInput = {
        userId: "",
        banReason: "Spamming",
      };

      const result = banUserSchema.safeParse(invalidInput);
      expect(result.success).toBe(false);
    });

    it("should reject negative banExpiresIn", () => {
      const invalidInput = {
        userId: "user-123",
        banExpiresIn: -100,
      };

      const result = banUserSchema.safeParse(invalidInput);
      expect(result.success).toBe(false);
    });
  });

  describe("setRoleSchema", () => {
    it("should validate valid role change", () => {
      const validInput = {
        userId: "user-123",
        role: "Admin",
      };

      const result = setRoleSchema.safeParse(validInput);
      expect(result.success).toBe(true);
    });

    it("should accept utilisateur role", () => {
      const validInput = {
        userId: "user-123",
        role: "utilisateur",
      };

      const result = setRoleSchema.safeParse(validInput);
      expect(result.success).toBe(true);
    });

    it("should reject invalid role", () => {
      const invalidInput = {
        userId: "user-123",
        role: "SuperAdmin",
      };

      const result = setRoleSchema.safeParse(invalidInput);
      expect(result.success).toBe(false);
    });
  });

  describe("listUsersFilterSchema", () => {
    it("should apply default values", () => {
      const result = listUsersFilterSchema.parse({});

      expect(result.page).toBe(1);
      expect(result.limit).toBe(10);
    });

    it("should validate custom filters", () => {
      const validFilters = {
        page: 2,
        limit: 25,
        role: "Admin",
        banned: true,
        search: "john",
      };

      const result = listUsersFilterSchema.safeParse(validFilters);
      expect(result.success).toBe(true);
    });

    it("should reject limit over 100", () => {
      const invalidInput = {
        limit: 500,
      };

      const result = listUsersFilterSchema.safeParse(invalidInput);
      expect(result.success).toBe(false);
    });
  });

  describe("createUserSchema", () => {
    it("should validate valid user creation input", () => {
      const validInput = {
        email: "user@example.com",
        password: "secure123",
        name: "John Doe",
        role: "utilisateur",
      };

      const result = createUserSchema.safeParse(validInput);
      expect(result.success).toBe(true);
    });

    it("should apply default role", () => {
      const inputWithoutRole = {
        email: "user@example.com",
        password: "secure123",
        name: "John Doe",
      };

      const result = createUserSchema.parse(inputWithoutRole);
      expect(result.role).toBe("utilisateur");
    });

    it("should reject invalid email", () => {
      const invalidInput = {
        email: "not-an-email",
        password: "secure123",
        name: "John Doe",
      };

      const result = createUserSchema.safeParse(invalidInput);
      expect(result.success).toBe(false);
    });

    it("should reject short password", () => {
      const invalidInput = {
        email: "user@example.com",
        password: "123",
        name: "John Doe",
      };

      const result = createUserSchema.safeParse(invalidInput);
      expect(result.success).toBe(false);
    });
  });
});
