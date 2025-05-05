export interface UpdateUserFields {
  description?: string;
  expire_at?: string;
  data_limit?: number;
  status?: string;
}

export interface BulkResponseDto {
  affected_rows: number;
}
