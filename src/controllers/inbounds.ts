import { BaseController } from "./base";
import {
  FullInboundsResponseDto,
  InboundsResponseDto,
} from "../models/inbounds";

export class InboundsController extends BaseController {
  async getFullInbounds(): Promise<FullInboundsResponseDto> {
    return this.get<FullInboundsResponseDto>("/inbounds/full");
  }

  async getInbounds(): Promise<InboundsResponseDto> {
    return this.get<InboundsResponseDto>("/inbounds");
  }
}
