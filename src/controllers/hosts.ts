import { BaseController } from "./base";
import {
  CreateHostRequestDto,
  DeleteHostResponseDto,
  HostResponseDto,
  HostsResponseDto,
  ReorderHostRequestDto,
  ReorderHostResponseDto,
  UpdateHostRequestDto,
} from "../models/hosts";

export class HostsController extends BaseController {
  async getAllHosts(): Promise<HostsResponseDto> {
    return this.get<HostsResponseDto>("/hosts");
  }

  async getOneHost(uuid: string): Promise<HostResponseDto> {
    return this.get<HostResponseDto>(`/hosts/${uuid}`);
  }

  async createHost(body: CreateHostRequestDto): Promise<HostResponseDto> {
    return this.post<HostResponseDto>("/hosts", body);
  }

  async updateHost(body: UpdateHostRequestDto): Promise<HostResponseDto> {
    return this.post<HostResponseDto>("/hosts/update", body);
  }

  async reorderHosts(
    hosts: ReorderHostRequestDto[]
  ): Promise<ReorderHostResponseDto> {
    return this.post<ReorderHostResponseDto>("/hosts/reorder", { hosts });
  }

  async deleteHost(uuid: string): Promise<DeleteHostResponseDto> {
    return this.delete<DeleteHostResponseDto>(`/hosts/${uuid}`);
  }
}
