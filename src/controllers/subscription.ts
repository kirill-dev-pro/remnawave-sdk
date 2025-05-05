import axios, { AxiosInstance } from "axios";

export interface SubscriptionDto {
  id: string;
  name: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateSubscriptionRequestDto {
  name: string;
}

export interface UpdateSubscriptionRequestDto {
  name?: string;
}

export class SubscriptionController {
  private axiosInstance: AxiosInstance;

  constructor(axiosInstance: AxiosInstance) {
    this.axiosInstance = axiosInstance;
  }

  async getSubscriptions(): Promise<SubscriptionDto[]> {
    const response = await this.axiosInstance.get("/subscriptions");
    return response.data;
  }

  async getSubscription(id: string): Promise<SubscriptionDto> {
    const response = await this.axiosInstance.get(`/subscriptions/${id}`);
    return response.data;
  }

  async createSubscription(
    data: CreateSubscriptionRequestDto
  ): Promise<SubscriptionDto> {
    const response = await this.axiosInstance.post("/subscriptions", data);
    return response.data;
  }

  async updateSubscription(
    id: string,
    data: UpdateSubscriptionRequestDto
  ): Promise<SubscriptionDto> {
    const response = await this.axiosInstance.put(`/subscriptions/${id}`, data);
    return response.data;
  }

  async deleteSubscription(id: string): Promise<void> {
    await this.axiosInstance.delete(`/subscriptions/${id}`);
  }
}
