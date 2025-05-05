import { vi } from "vitest";

// This will run before all tests
beforeAll(() => {
  // Mock axios globally to prevent actual HTTP requests
  vi.mock("axios", () => {
    return {
      default: {
        create: () => ({
          get: vi.fn().mockResolvedValue({ data: {} }),
          post: vi.fn().mockResolvedValue({ data: {} }),
          put: vi.fn().mockResolvedValue({ data: {} }),
          patch: vi.fn().mockResolvedValue({ data: {} }),
          delete: vi.fn().mockResolvedValue({ data: {} }),
          defaults: {
            baseURL: "http://mocked-url.com",
            headers: {
              Authorization: "Bearer mocked-token",
              "Content-Type": "application/json",
            },
          },
        }),
      },
    };
  });
});
