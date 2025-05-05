import { BaseController } from "./base";
import { NodesUsageResponseDto } from "../models/bandwidth-stats";

export class BandwidthStatsController extends BaseController {
  async getNodesUsageByRange(
    start: string,
    end: string
  ): Promise<NodesUsageResponseDto> {
    return this.get<NodesUsageResponseDto>(
      `/stats/nodes-usage?start=${start}&end=${end}`
    );
  }
}
