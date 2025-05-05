import { BaseController } from "./base";
import { UserUsageByRangeResponseDto } from "../models/users-stats";

export class UsersStatsController extends BaseController {
  async getUserUsageByRange(
    uuid: string,
    start: string,
    end: string
  ): Promise<UserUsageByRangeResponseDto> {
    return this.get<UserUsageByRangeResponseDto>(
      `/stats/user-usage?uuid=${uuid}&start=${start}&end=${end}`
    );
  }
}
