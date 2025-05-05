import { describe, expect, test, vi, beforeEach } from "vitest";
import { createMockedSDK, generateIsoformatRange } from "./test-setup";
import { RemnawaveSDK } from "../index";
import { NodesUsageResponseDto } from "../models/bandwidth-stats";

describe("BandwidthStatsController", () => {
  let client: RemnawaveSDK;

  beforeEach(() => {
    client = createMockedSDK();
    vi.clearAllMocks();
  });

  test("should get nodes usage by range", async () => {
    // Prepare test data
    const [start, end] = generateIsoformatRange();

    // Setup mock response
    const mockResponse = {
      nodes: [
        {
          uuid: "node-uuid-123",
          name: "Test Node",
          address: "192.168.1.1",
          inbound: "inbound-test",
          download: 1024000,
          upload: 2048000,
        },
      ],
    };

    // Mock the get method to return our test data
    const getSpy = vi.spyOn(client.bandwidthstats["client"], "get");
    getSpy.mockResolvedValueOnce({ data: mockResponse });

    // Test get nodes usage by range
    const result = await client.bandwidthstats.getNodesUsageByRange(start, end);

    // Verify the API was called with the right parameters
    expect(getSpy).toHaveBeenCalledWith(
      `/stats/nodes-usage?start=${start}&end=${end}`
    );

    // Verify the response
    expect(result).toEqual(mockResponse);
    expect(result.nodes).toHaveLength(1);
    expect(result.nodes[0]).toHaveProperty("uuid", "node-uuid-123");
    expect(result.nodes[0]).toHaveProperty("download", 1024000);
    expect(result.nodes[0]).toHaveProperty("upload", 2048000);
  });
});
