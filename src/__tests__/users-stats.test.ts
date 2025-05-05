import { describe, expect, test, vi, beforeEach } from "vitest";
import { createMockedSDK } from "./test-setup";
import { RemnawaveSDK } from "../index";
import { UserUsageByRangeResponseDto } from "../models/users-stats";
import { TEST_USER_UUID } from "../constants";
import { generateIsoformatRange } from "./utils";

describe("UsersStatsController", () => {
  let client: RemnawaveSDK;

  beforeEach(() => {
    client = createMockedSDK();
    vi.clearAllMocks();
  });

  test("should get user usage by range", async () => {
    // Prepare test data
    const [start, end] = generateIsoformatRange();

    // Mock API response
    const mockResponse = {
      uuid: TEST_USER_UUID,
      username: "testuser",
      email: "test@example.com",
      usage: [
        {
          date: start.split("T")[0],
          download: 1024,
          upload: 2048,
        },
      ],
    };

    const getUserUsageSpy = vi.spyOn(client.users_stats["client"], "get");
    getUserUsageSpy.mockResolvedValueOnce({ data: mockResponse });

    // Test get user usage by range
    const result = await client.users_stats.getUserUsageByRange(
      TEST_USER_UUID,
      start,
      end
    );

    // Verify API was called with the right path
    expect(getUserUsageSpy).toHaveBeenCalledWith(
      `/stats/user-usage?uuid=${TEST_USER_UUID}&start=${start}&end=${end}`
    );

    // Verify response
    expect(result).toEqual(mockResponse);
    expect(result).toHaveProperty("uuid");
    expect(result).toHaveProperty("username");
    expect(result).toHaveProperty("email");
    expect(result).toHaveProperty("usage");
    expect(result.uuid).toBe(TEST_USER_UUID);
  });
});
