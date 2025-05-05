import axios, { AxiosInstance } from "axios";

export interface LoginRequestDto {
  username: string;
  password: string;
}

export interface LoginResponseDto {
  token: string;
}

export class AuthController {
  private axiosInstance: AxiosInstance;

  constructor(axiosInstance: AxiosInstance) {
    this.axiosInstance = axiosInstance;
  }

  async login(data: LoginRequestDto): Promise<LoginResponseDto> {
    const response = await this.axiosInstance.post("/auth/login", data);
    return response.data;
  }

  async logout(): Promise<void> {
    await this.axiosInstance.post("/auth/logout");
  }

  async refreshToken(): Promise<LoginResponseDto> {
    const response = await this.axiosInstance.post("/auth/refresh");
    return response.data;
  }
}
