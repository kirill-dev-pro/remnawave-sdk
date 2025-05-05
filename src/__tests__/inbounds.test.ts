import { describe, expect, test, vi, beforeEach } from "vitest";
import { createMockedSDK } from "./test-setup";
import { RemnawaveSDK } from "../index";
import { FullInboundResponseDto, InboundResponseDto } from "../models/inbounds";

describe("InboundsController", () => {
  let client: RemnawaveSDK;

  beforeEach(() => {
    client = createMockedSDK();
    vi.clearAllMocks();
  });

  test("should get full inbounds", async () => {
    // Mock API response
    const mockResponse = {
      response: [
        {
          uuid: "inbound-uuid-123",
          tag: "inbound-tag",
          type: "vmess",
          port: 8080,
          network: "tcp",
          security: "tls",
          rawFromConfig: {},
          users: {
            enabled: 10,
            disabled: 2,
          },
          nodes: {
            enabled: 5,
            disabled: 1,
          },
        },
      ],
    };

    // Mock the get method
    const getSpy = vi.spyOn(client.inbounds["client"], "get");
    getSpy.mockResolvedValueOnce({ data: { response: mockResponse.response } });

    // Test get full inbounds
    const result = await client.inbounds.getFullInbounds();

    // Verify API was called with the right path
    expect(getSpy).toHaveBeenCalledWith("/inbounds/full");

    // Verify response - casting to array for testing
    const resultArray = result as unknown as FullInboundResponseDto[];
    expect(resultArray).toEqual(mockResponse.response);
    expect(Array.isArray(resultArray)).toBe(true);
    expect(resultArray.length).toBe(1);
    expect(resultArray[0]).toHaveProperty("uuid", "inbound-uuid-123");
    expect(resultArray[0]).toHaveProperty("type", "vmess");
  });

  test("should get inbounds", async () => {
    // Mock API response
    const mockResponse = {
      response: [
        {
          uuid: "inbound-uuid-123",
          tag: "inbound-tag",
          type: "vmess",
          port: 8080,
          network: "tcp",
          security: "tls",
        },
      ],
    };

    // Mock the get method
    const getSpy = vi.spyOn(client.inbounds["client"], "get");
    getSpy.mockResolvedValueOnce({ data: { response: mockResponse.response } });

    // Test get inbounds
    const result = await client.inbounds.getInbounds();

    // Verify API was called with the right path
    expect(getSpy).toHaveBeenCalledWith("/inbounds");

    // Verify response - casting to array for testing
    const resultArray = result as unknown as InboundResponseDto[];
    expect(resultArray).toEqual(mockResponse.response);
    expect(Array.isArray(resultArray)).toBe(true);
    expect(resultArray.length).toBe(1);
    expect(resultArray[0]).toHaveProperty("uuid", "inbound-uuid-123");
    expect(resultArray[0]).toHaveProperty("type", "vmess");
  });
});
