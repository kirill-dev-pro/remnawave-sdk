import { describe, expect, test, vi, beforeEach } from "vitest";
import { createMockedSDK } from "./test-setup";
import { RemnawaveSDK } from "../index";
import {
  BulkResponseDto,
  UpdateUserFields,
} from "../models/users-bulk-actions";
import { TEST_USER_UUID } from "../constants";

describe("UsersBulkActionsController", () => {
  let client: RemnawaveSDK;

  beforeEach(() => {
    client = createMockedSDK();
    vi.clearAllMocks();
  });

  test("should bulk update users", async () => {
    // Prepare test data
    const currentDate = new Date();
    const expireAt = new Date(currentDate.getTime() + 14 * 24 * 60 * 60 * 1000); // 14 days
    const expireAtIso = expireAt.toISOString();
    const description = "TEST_DESCRIPTION";
    const uuids = [TEST_USER_UUID];

    // Mock API response
    const mockResponse = {
      affected_rows: uuids.length,
    };

    const bulkUpdateSpy = vi.spyOn(client.users_bulk_actions["client"], "post");
    bulkUpdateSpy.mockResolvedValueOnce({ data: mockResponse });

    // Prepare request data
    const fields = {
      description,
      expire_at: expireAtIso,
    };

    const requestPayload = {
      uuids,
      fields,
    };

    // Test bulk update users
    const result = await client.users_bulk_actions.bulkUpdateUsers(
      uuids,
      fields
    );

    // Verify API was called with the right path and data
    expect(bulkUpdateSpy).toHaveBeenCalledWith(
      "/users/bulk-update",
      requestPayload
    );

    // Verify response
    expect(result).toEqual(mockResponse);
    expect(result).toHaveProperty("affected_rows");
    expect(result.affected_rows).toBe(uuids.length);
  });
});
