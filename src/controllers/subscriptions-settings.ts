import { BaseController } from "./base";
import {
  SubscriptionSettingsResponseDto,
  UpdateSubscriptionSettingsRequestDto,
} from "../models/subscriptions-settings";

export class SubscriptionsSettingsController extends BaseController {
  async getSettings(): Promise<SubscriptionSettingsResponseDto> {
    return this.get<SubscriptionSettingsResponseDto>("/subscription/settings");
  }

  async updateSettings(
    body: UpdateSubscriptionSettingsRequestDto
  ): Promise<SubscriptionSettingsResponseDto> {
    return this.post<SubscriptionSettingsResponseDto>(
      "/subscription/settings",
      body
    );
  }
}
