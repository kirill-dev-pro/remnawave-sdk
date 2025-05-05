import { describe, expect, test, vi, beforeEach } from "vitest";
import { createMockedSDK } from "./test-setup";
import { RemnawaveSDK } from "../index";
import {
  SubscriptionSettingsResponseDto,
  UpdateSubscriptionSettingsRequestDto,
} from "../models/subscriptions-settings";

describe("SubscriptionsSettingsController", () => {
  let client: RemnawaveSDK;

  beforeEach(() => {
    client = createMockedSDK();
    vi.clearAllMocks();
  });

  test("should get and update settings", async () => {
    // Setup mock data
    const mockSettings = {
      uuid: "settings-uuid-123",
      show_usage: true,
      show_node_info: true,
      show_nodes_status: false,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    // Mock get settings response
    const getSettingsSpy = vi.spyOn(
      client.subscriptions_settings["client"],
      "get"
    );
    getSettingsSpy.mockResolvedValueOnce({ data: mockSettings });

    // Test get settings
    const settings = await client.subscriptions_settings.getSettings();

    // Verify API was called with the right path
    expect(getSettingsSpy).toHaveBeenCalledWith("/subscription/settings");

    // Verify response
    expect(settings).toEqual(mockSettings);
    expect(settings).toHaveProperty("uuid");
    expect(settings).toHaveProperty("show_usage");
    expect(settings).toHaveProperty("show_node_info");
    expect(settings).toHaveProperty("show_nodes_status");
    expect(settings.uuid).toBe(mockSettings.uuid);

    // Mock update settings response
    const updatedSettings = {
      ...mockSettings,
      show_usage: !mockSettings.show_usage,
      updated_at: new Date().toISOString(),
    };

    const updateSettingsSpy = vi.spyOn(
      client.subscriptions_settings["client"],
      "post"
    );
    updateSettingsSpy.mockResolvedValueOnce({ data: updatedSettings });

    // Test update settings
    const updateRequest: UpdateSubscriptionSettingsRequestDto = {
      uuid: mockSettings.uuid,
      show_usage: !mockSettings.show_usage,
    };

    const result = await client.subscriptions_settings.updateSettings(
      updateRequest
    );

    // Verify API was called with the right path and data
    expect(updateSettingsSpy).toHaveBeenCalledWith(
      "/subscription/settings",
      updateRequest
    );

    // Verify response
    expect(result).toEqual(updatedSettings);
    expect(result).toHaveProperty("uuid");
    expect(result.uuid).toBe(mockSettings.uuid);
    expect(result.show_usage).toBe(!mockSettings.show_usage);
  });
});
