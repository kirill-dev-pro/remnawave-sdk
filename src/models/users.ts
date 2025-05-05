export interface UserResponseDto {
  uuid: string;
  username: string;
  email: string;
  telegram_id?: string;
  subscription_uuid: string;
  data_limit: number;
  data_used: number;
  created_at: string;
  expire_at: string;
  status: "active" | "disabled" | "expired";
  sub_updated_at: string;
  sub_last_user_agent?: string;
  online_at?: string;
  on_hold_expire_at?: string;
  on_hold_timeout_at?: string;
  note?: string;
  sub_revoked_at?: string;
  sub_updated_by?: string;
  sub_revoked_by?: string;
}

export interface UsersResponseDto {
  total: number;
  users: UserResponseDto[];
}

export interface CreateUserRequestDto {
  username: string;
  email: string;
  telegram_id?: string;
  data_limit: number;
  expire_at: string;
  note?: string;
}

export interface UpdateUserRequestDto {
  uuid: string;
  username?: string;
  email?: string;
  telegram_id?: string;
  data_limit?: number;
  expire_at?: string;
  note?: string;
}

export interface DeleteUserResponseDto {
  message: string;
}

export interface EmailUserResponseDto {
  users: UserResponseDto[];
}

export interface TelegramUserResponseDto {
  users: UserResponseDto[];
}
