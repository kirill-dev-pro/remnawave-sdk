import axios, { AxiosInstance } from "axios";

export interface SystemInfoDto {
  version: string;
  uptime: number;
  memory: {
    total: number;
    used: number;
    free: number;
  };
  cpu: {
    usage: number;
    cores: number;
  };
}

export interface SystemSettingsDto {
  logLevel: string;
  maxConnections: number;
  timeout: number;
}

export class SystemController {
  private axiosInstance: AxiosInstance;

  constructor(axiosInstance: AxiosInstance) {
    this.axiosInstance = axiosInstance;
  }

  async getSystemInfo(): Promise<SystemInfoDto> {
    const response = await this.axiosInstance.get("/system/info");
    return response.data;
  }

  async getSystemSettings(): Promise<SystemSettingsDto> {
    const response = await this.axiosInstance.get("/system/settings");
    return response.data;
  }

  async restartSystem(): Promise<void> {
    await this.axiosInstance.post("/system/restart");
  }

  async shutdownSystem(): Promise<void> {
    await this.axiosInstance.post("/system/shutdown");
  }
}
