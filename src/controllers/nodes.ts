import axios, { AxiosInstance } from "axios";

export interface NodeDto {
  id: string;
  name: string;
  type: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface NodeStatusDto {
  status: string;
  lastSeen: string;
}

export interface CreateNodeRequestDto {
  name: string;
  type: string;
}

export interface UpdateNodeRequestDto {
  name?: string;
  type?: string;
}

export class NodesController {
  private axiosInstance: AxiosInstance;

  constructor(axiosInstance: AxiosInstance) {
    this.axiosInstance = axiosInstance;
  }

  async getNodes(): Promise<NodeDto[]> {
    const response = await this.axiosInstance.get("/nodes");
    return response.data;
  }

  async getNode(id: string): Promise<NodeDto> {
    const response = await this.axiosInstance.get(`/nodes/${id}`);
    return response.data;
  }

  async getNodeStatus(id: string): Promise<NodeStatusDto> {
    const response = await this.axiosInstance.get(`/nodes/${id}/status`);
    return response.data;
  }

  async createNode(data: CreateNodeRequestDto): Promise<NodeDto> {
    const response = await this.axiosInstance.post("/nodes", data);
    return response.data;
  }

  async updateNode(id: string, data: UpdateNodeRequestDto): Promise<NodeDto> {
    const response = await this.axiosInstance.put(`/nodes/${id}`, data);
    return response.data;
  }

  async deleteNode(id: string): Promise<void> {
    await this.axiosInstance.delete(`/nodes/${id}`);
  }
}
