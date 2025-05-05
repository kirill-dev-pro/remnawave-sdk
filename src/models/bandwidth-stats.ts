export interface NodeUsage {
  uuid: string;
  name: string;
  address: string;
  inbound: string;
  download: number;
  upload: number;
}

export interface NodesUsageResponseDto {
  nodes: NodeUsage[];
}
