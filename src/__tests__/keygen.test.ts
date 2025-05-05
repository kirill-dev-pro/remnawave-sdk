import { describe, expect, test, vi, beforeEach } from "vitest";
import { createMockedSDK } from "./test-setup";
import { RemnawaveSDK } from "../index";
import { PubKeyResponseDto } from "../models/keygen";

describe("KeygenController", () => {
  let client: RemnawaveSDK;

  beforeEach(() => {
    client = createMockedSDK();
    vi.clearAllMocks();
  });

  test("should generate key", async () => {
    // Mock API response
    const mockResponse = {
      response: {
        pubKey: "sample-public-key",
      },
    };

    // Mock the get method
    const getSpy = vi.spyOn(client.keygen["client"], "get");
    getSpy.mockResolvedValueOnce({ data: mockResponse });

    // Test get key
    const key = await client.keygen.generateKey();

    // Verify API was called with the right path
    expect(getSpy).toHaveBeenCalledWith("/keygen/get");

    // Verify response
    expect(key).toEqual(mockResponse.response);
    expect(key).toHaveProperty("pubKey", "sample-public-key");
  });
});
