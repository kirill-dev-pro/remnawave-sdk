import { BaseController } from "./base";
import { PubKeyResponseDto } from "../models/keygen";

export class KeygenController extends BaseController {
  async generateKey(): Promise<PubKeyResponseDto> {
    return this.get<PubKeyResponseDto>("/keygen/get");
  }
}
