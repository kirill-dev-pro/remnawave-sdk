export interface HostResponseDto {
  uuid: string;
  inbound_uuid: string;
  address: string;
  port: number;
  remark: string;
  alpn?: string;
  fingerprint?: string;
  view_position: number;
  created_at: string;
  updated_at: string;
}

export interface HostsResponseDto {
  hosts: HostResponseDto[];
}

export interface CreateHostRequestDto {
  inbound_uuid: string;
  address: string;
  port: number;
  remark: string;
  alpn?: string;
  fingerprint?: string;
}

export interface UpdateHostRequestDto {
  uuid: string;
  address?: string;
  port?: number;
  remark?: string;
  alpn?: string;
  fingerprint?: string;
}

export interface ReorderHostRequestDto {
  uuid: string;
  view_position: number;
}

export interface ReorderHostResponseDto {
  is_updated: boolean;
}

export interface DeleteHostResponseDto {
  is_deleted: boolean;
}
