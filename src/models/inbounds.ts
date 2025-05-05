export interface InboundResponseDto {
  uuid: string;
  tag: string;
  type: string; // Changed from 'protocol' to match Python
  port: number;
  network?: string;
  security?: string;
}

export interface InboundsResponseDto {
  response: InboundResponseDto[]; // Changed from 'inbounds' to match Python response wrapper
}

export interface FullInboundStatistic {
  enabled: number;
  disabled: number;
}

export interface FullInboundResponseDto {
  uuid: string;
  tag: string;
  type: string; // Changed from 'protocol' to match Python
  port: number;
  network?: string;
  security?: string;
  rawFromConfig: any; // Match the Python field name with alias
  users: FullInboundStatistic;
  nodes: FullInboundStatistic;
}

export interface FullInboundsResponseDto {
  response: FullInboundResponseDto[]; // Changed from 'inbounds' to match Python response wrapper
}
