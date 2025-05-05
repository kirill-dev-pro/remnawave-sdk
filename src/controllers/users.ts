import { BaseController } from "./base";
import {
  CreateUserRequestDto,
  DeleteUserResponseDto,
  EmailUserResponseDto,
  TelegramUserResponseDto,
  UpdateUserRequestDto,
  UserResponseDto,
  UsersResponseDto,
} from "../models/users";

export class UsersController extends BaseController {
  async createUser(body: CreateUserRequestDto): Promise<UserResponseDto> {
    return this.post<UserResponseDto>("/users", body);
  }

  async updateUser(body: UpdateUserRequestDto): Promise<UserResponseDto> {
    return this.post<UserResponseDto>("/users/update", body);
  }

  async getAllUsersV2(): Promise<UsersResponseDto> {
    return this.get<UsersResponseDto>("/users/v2");
  }

  async revokeUserSubscription(uuid: string): Promise<UserResponseDto> {
    return this.patch<UserResponseDto>(`/users/revoke/${uuid}`);
  }

  async disableUser(uuid: string): Promise<UserResponseDto> {
    return this.patch<UserResponseDto>(`/users/disable/${uuid}`);
  }

  async deleteUser(uuid: string): Promise<DeleteUserResponseDto> {
    return this.delete<DeleteUserResponseDto>(`/users/delete/${uuid}`);
  }

  async enableUser(uuid: string): Promise<UserResponseDto> {
    return this.patch<UserResponseDto>(`/users/enable/${uuid}`);
  }

  async resetUserTraffic(uuid: string): Promise<UserResponseDto> {
    return this.patch<UserResponseDto>(`/users/reset-traffic/${uuid}`);
  }

  async getUserByShortUuid(shortUuid: string): Promise<UserResponseDto> {
    return this.get<UserResponseDto>(`/users/short-uuid/${shortUuid}`);
  }

  async getUserBySubscriptionUuid(
    subscriptionUuid: string
  ): Promise<UserResponseDto> {
    return this.get<UserResponseDto>(`/users/sub-uuid/${subscriptionUuid}`);
  }

  async getUserByUuid(uuid: string): Promise<UserResponseDto> {
    return this.get<UserResponseDto>(`/users/uuid/${uuid}`);
  }

  async getUserByUsername(username: string): Promise<UserResponseDto> {
    return this.get<UserResponseDto>(`/users/username/${username}`);
  }

  async getUsersByTelegramId(
    telegramId: string
  ): Promise<TelegramUserResponseDto> {
    return this.get<TelegramUserResponseDto>(`/users/tg/${telegramId}`);
  }

  async getUsersByEmail(email: string): Promise<EmailUserResponseDto> {
    return this.get<EmailUserResponseDto>(`/users/email/${email}`);
  }
}
