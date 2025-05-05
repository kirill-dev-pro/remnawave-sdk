import { AxiosInstance, AxiosError } from "axios";

export interface ApiErrorResponse {
  timestamp: string;
  path: string;
  message: string;
  code: string;
}

export class ApiError extends Error {
  statusCode: number;
  apiResponse: ApiErrorResponse;

  constructor(statusCode: number, apiResponse: ApiErrorResponse) {
    super(apiResponse.message);
    this.statusCode = statusCode;
    this.apiResponse = apiResponse;
    this.name = "ApiError";
  }
}

export class BaseController {
  protected client: AxiosInstance;

  constructor(client: AxiosInstance) {
    this.client = client;
  }

  protected async get<T>(path: string): Promise<T> {
    try {
      const response = await this.client.get(path);
      return this.handleResponse<T>(response.data);
    } catch (error) {
      this.handleError(error as Error);
      throw error; // This line should never be reached
    }
  }

  protected async post<T>(path: string, data?: any): Promise<T> {
    try {
      const response = await this.client.post(path, data);
      return this.handleResponse<T>(response.data);
    } catch (error) {
      this.handleError(error as Error);
      throw error; // This line should never be reached
    }
  }

  protected async put<T>(path: string, data?: any): Promise<T> {
    try {
      const response = await this.client.put(path, data);
      return this.handleResponse<T>(response.data);
    } catch (error) {
      this.handleError(error as Error);
      throw error; // This line should never be reached
    }
  }

  protected async patch<T>(path: string, data?: any): Promise<T> {
    try {
      const response = await this.client.patch(path, data);
      return this.handleResponse<T>(response.data);
    } catch (error) {
      this.handleError(error as Error);
      throw error; // This line should never be reached
    }
  }

  protected async delete<T>(path: string): Promise<T> {
    try {
      const response = await this.client.delete(path);
      return this.handleResponse<T>(response.data);
    } catch (error) {
      this.handleError(error as Error);
      throw error; // This line should never be reached
    }
  }

  private handleResponse<T>(data: any): T {
    // If data has a "response" field, extract it
    if (data && typeof data === "object" && "response" in data) {
      return data.response as T;
    }
    return data as T;
  }

  private handleError(error: Error): never {
    if (error instanceof AxiosError && error.response) {
      const { status, data } = error.response;

      // Try to parse API error response
      let apiResponse: ApiErrorResponse;

      if (data && typeof data === "object") {
        apiResponse = {
          timestamp: data.timestamp || new Date().toISOString(),
          path: data.path || "",
          message: data.message || error.message,
          code: data.code || "UNKNOWN_ERROR",
        };
      } else {
        apiResponse = {
          timestamp: new Date().toISOString(),
          path: "",
          message: error.message,
          code: "UNKNOWN_ERROR",
        };
      }

      throw new ApiError(status, apiResponse);
    } else {
      // Network or other errors
      const apiResponse: ApiErrorResponse = {
        timestamp: new Date().toISOString(),
        path: "",
        message: error.message,
        code: "NETWORK_ERROR",
      };

      throw new ApiError(0, apiResponse);
    }
  }
}
