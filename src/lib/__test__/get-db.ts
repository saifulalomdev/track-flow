import { describe, it, expect, vi } from "vitest";
import { getDb } from "../get-db";

describe("getDb() Utility Bootstrapper", () => {
  it("should successfully initialize Drizzle when given a valid D1 binding", () => {
    // 1. Arrange: Mock the minimum required D1 database engine interface methods
    const mockD1Database = {
      prepare: vi.fn(),
      dump: vi.fn(),
      batch: vi.fn(),
      exec: vi.fn(),
    };

    const mockEnv = {
      DB: mockD1Database,
    } as any; // Cast as any to bypass other Cloudflare bindings requirements

    // 2. Act
    const dbInstance = getDb(mockEnv);

    // 3. Assert: Verify it returns a valid Drizzle instance by checking its core method shapes
    expect(dbInstance).toBeDefined();
    expect(dbInstance.run).toBeTypeOf("function");
    expect(dbInstance.select).toBeTypeOf("function");
  });

  it("should throw a specific operational error if env parameter is completely missing", () => {
    // Act & Assert: Expecting the function execution block to reject instantly
    expect(() => getDb(undefined)).toThrowError(
      "DATABASE_BINDING_MISSING: Ensure wrangler.jsonc contains the DB binding"
    );
  });

  it("should throw an operational error if env exists but the DB object property is undefined", () => {
    // Arrange: Simulating a situation where other vars are bound but D1 is skipped
    const invalidEnv = {
      SOME_OTHER_SECRET: "12345",
    } as any;

    // Act & Assert
    expect(() => getDb(invalidEnv)).toThrowError(
      "DATABASE_BINDING_MISSING: Ensure wrangler.jsonc contains the DB binding"
    );
  });
});
