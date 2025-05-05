export interface UserUsage {
  date: string;
  download: number;
  upload: number;
}

export interface UserUsageByRangeResponseDto {
  uuid: string;
  username: string;
  email: string;
  usage: UserUsage[];
}
