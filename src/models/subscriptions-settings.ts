export interface SubscriptionSettingsResponseDto {
  uuid: string;
  show_usage: boolean;
  show_node_info: boolean;
  show_nodes_status: boolean;
  created_at: string;
  updated_at: string;
}

export interface UpdateSubscriptionSettingsRequestDto {
  uuid: string;
  show_usage?: boolean;
  show_node_info?: boolean;
  show_nodes_status?: boolean;
}
