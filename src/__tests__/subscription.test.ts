import { describe, expect, it, beforeEach, vi } from "vitest";
import axios from "axios";
import { SubscriptionController } from "../controllers/subscription";
import { SubscriptionDto } from "../controllers/subscription";

describe("SubscriptionController", () => {
  let subscriptionController: SubscriptionController;
  const mockedAxios = {
    post: vi.fn(() => Promise.resolve({ data: {} })),
    get: vi.fn(() => Promise.resolve({ data: {} })),
    put: vi.fn(() => Promise.resolve({ data: {} })),
    patch: vi.fn(() => Promise.resolve({ data: {} })),
    delete: vi.fn(() => Promise.resolve({ data: {} })),
  };

  beforeEach(() => {
    vi.clearAllMocks();
    subscriptionController = new SubscriptionController(mockedAxios as any);
  });

  it("should fetch all subscriptions", async () => {
    const mockSubscriptions: SubscriptionDto[] = [
      {
        id: "sub1",
        name: "Subscription 1",
        status: "active",
        createdAt: "2024-01-01T00:00:00Z",
        updatedAt: "2024-01-01T00:00:00Z",
      },
    ];

    mockedAxios.get.mockResolvedValueOnce({ data: mockSubscriptions });

    const result = await subscriptionController.getSubscriptions();

    expect(result).toEqual(mockSubscriptions);
    expect(mockedAxios.get).toHaveBeenCalledWith("/subscriptions");
  });

  it("should fetch a subscription by id", async () => {
    const mockSubscription: SubscriptionDto = {
      id: "sub1",
      name: "Subscription 1",
      status: "active",
      createdAt: "2024-01-01T00:00:00Z",
      updatedAt: "2024-01-01T00:00:00Z",
    };

    mockedAxios.get.mockResolvedValueOnce({ data: mockSubscription });

    const result = await subscriptionController.getSubscription("sub1");

    expect(result).toEqual(mockSubscription);
    expect(mockedAxios.get).toHaveBeenCalledWith("/subscriptions/sub1");
  });

  it("should create a subscription", async () => {
    const mockSubscription: SubscriptionDto = {
      id: "sub1",
      name: "Subscription 1",
      status: "active",
      createdAt: "2024-01-01T00:00:00Z",
      updatedAt: "2024-01-01T00:00:00Z",
    };

    mockedAxios.post.mockResolvedValueOnce({ data: mockSubscription });

    const result = await subscriptionController.createSubscription({
      name: "Subscription 1",
    });

    expect(result).toEqual(mockSubscription);
    expect(mockedAxios.post).toHaveBeenCalledWith("/subscriptions", {
      name: "Subscription 1",
    });
  });

  it("should update a subscription", async () => {
    const mockSubscription: SubscriptionDto = {
      id: "sub1",
      name: "Updated Subscription 1",
      status: "active",
      createdAt: "2024-01-01T00:00:00Z",
      updatedAt: "2024-01-01T00:00:00Z",
    };

    mockedAxios.put.mockResolvedValueOnce({ data: mockSubscription });

    const result = await subscriptionController.updateSubscription("sub1", {
      name: "Updated Subscription 1",
    });

    expect(result).toEqual(mockSubscription);
    expect(mockedAxios.put).toHaveBeenCalledWith("/subscriptions/sub1", {
      name: "Updated Subscription 1",
    });
  });

  it("should delete a subscription", async () => {
    await subscriptionController.deleteSubscription("sub1");
    expect(mockedAxios.delete).toHaveBeenCalledWith("/subscriptions/sub1");
  });
});
