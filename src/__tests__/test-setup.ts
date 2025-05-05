import { vi, Mock } from "vitest";
import axios, { AxiosInstance } from "axios";
import { RemnawaveSDK } from "../index";

// Create a mocked client for testing
export function createMockedClient(): AxiosInstance {
  return {
    get: vi.fn().mockResolvedValue({ data: {} }),
    post: vi.fn().mockResolvedValue({ data: {} }),
    put: vi.fn().mockResolvedValue({ data: {} }),
    patch: vi.fn().mockResolvedValue({ data: {} }),
    delete: vi.fn().mockResolvedValue({ data: {} }),
    create: vi.fn(),
    defaults: {
      baseURL: "http://mocked-url.com",
      headers: {
        Authorization: "Bearer mocked-token",
        "Content-Type": "application/json",
      },
    },
  } as unknown as AxiosInstance;
}

// This function creates a mocked RemnawaveSDK instance
export function createMockedSDK(): RemnawaveSDK {
  // Mock axios.create to return our mocked client
  const mockedCreate = vi.spyOn(axios, "create");
  mockedCreate.mockReturnValue(createMockedClient());

  // Create the SDK with mock values
  return new RemnawaveSDK("http://mocked-url.com", "mocked-token");
}

// This function wraps the response data in a structure matching the API
export function wrapResponse(responseData: any): any {
  // If the response is already wrapped, return it
  if (
    responseData &&
    typeof responseData === "object" &&
    "response" in responseData
  ) {
    return responseData;
  }

  // Otherwise, wrap it in a response object
  return { response: responseData };
}

// This function sets up a mock response for a specific endpoint
export function mockApiResponse(
  method: "get" | "post" | "put" | "patch" | "delete",
  path: string,
  responseData: any,
  shouldWrapResponse = true
) {
  // Get the mocked method from axios.create's return value
  const axiosInstance = axios.create({} as any);
  const mockedMethod = axiosInstance[method] as Mock;

  // Setup the mock implementation for the next call
  mockedMethod.mockImplementationOnce((requestPath: string, data?: any) => {
    if (requestPath === path) {
      const finalResponse = shouldWrapResponse
        ? wrapResponse(responseData)
        : responseData;
      return Promise.resolve({ data: finalResponse });
    }
    return Promise.reject(
      new Error(`Unexpected ${method.toUpperCase()} request to ${requestPath}`)
    );
  });
}

// Helper function to generate date range for tests (YYYY-MM-DD format)
export function generateIsoformatRange(daysAgo = 30): [string, string] {
  const end = new Date();
  const start = new Date();
  start.setDate(start.getDate() - daysAgo);

  return [start.toISOString().split("T")[0], end.toISOString().split("T")[0]];
}
