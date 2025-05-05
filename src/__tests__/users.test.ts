import { describe, it, expect, beforeEach, vi } from "vitest";
import { UsersController } from "../controllers/users";
import { UserResponseDto } from "../models/users";

// Create mock functions for axios methods
const mockGet = vi.fn();
const mockPost = vi.fn();
const mockPatch = vi.fn();
const mockDelete = vi.fn();

// Create a mock axios client
const mockAxiosClient = {
  get: mockGet,
  post: mockPost,
  patch: mockPatch,
  delete: mockDelete,
};

describe("UsersController", () => {
  let usersController: UsersController;

  beforeEach(() => {
    vi.clearAllMocks();
    usersController = new UsersController(mockAxiosClient as any);
  });

  describe("getAllUsersV2", () => {
    it("should fetch all users", async () => {
      const mockResponse = {
        total: 2,
        users: [
          {
            uuid: "test-uuid-1",
            username: "user1",
            email: "user1@example.com",
            subscription_uuid: "sub-uuid-1",
            data_limit: 1000,
            data_used: 500,
            created_at: "2024-01-01T00:00:00Z",
            expire_at: "2024-12-31T00:00:00Z",
            status: "active",
            sub_updated_at: "2024-01-01T00:00:00Z",
          },
          {
            uuid: "test-uuid-2",
            username: "user2",
            email: "user2@example.com",
            subscription_uuid: "sub-uuid-2",
            data_limit: 2000,
            data_used: 1000,
            created_at: "2024-01-01T00:00:00Z",
            expire_at: "2024-12-31T00:00:00Z",
            status: "active",
            sub_updated_at: "2024-01-01T00:00:00Z",
          },
        ],
      };

      mockGet.mockResolvedValueOnce({ data: mockResponse });

      const result = await usersController.getAllUsersV2();

      expect(result).toEqual(mockResponse);
      expect(mockGet).toHaveBeenCalledWith("/users/v2");
    });
  });

  describe("createUser", () => {
    it("should create a new user", async () => {
      const mockUserData = {
        username: "newuser",
        email: "newuser@example.com",
        data_limit: 1000,
        expire_at: "2024-12-31T00:00:00Z",
      };

      const mockResponse: UserResponseDto = {
        uuid: "new-uuid",
        username: "newuser",
        email: "newuser@example.com",
        subscription_uuid: "new-sub-uuid",
        data_limit: 1000,
        data_used: 0,
        created_at: "2024-01-01T00:00:00Z",
        expire_at: "2024-12-31T00:00:00Z",
        status: "active",
        sub_updated_at: "2024-01-01T00:00:00Z",
      };

      mockPost.mockResolvedValueOnce({ data: mockResponse });

      const result = await usersController.createUser(mockUserData);

      expect(result).toEqual(mockResponse);
      expect(mockPost).toHaveBeenCalledWith("/users", mockUserData);
    });
  });

  describe("disableUser", () => {
    it("should disable a user", async () => {
      const uuid = "test-uuid";
      const mockResponse: UserResponseDto = {
        uuid,
        username: "testuser",
        email: "testuser@example.com",
        subscription_uuid: "sub-uuid",
        data_limit: 1000,
        data_used: 500,
        created_at: "2024-01-01T00:00:00Z",
        expire_at: "2024-12-31T00:00:00Z",
        status: "disabled",
        sub_updated_at: "2024-01-01T00:00:00Z",
      };

      mockPatch.mockResolvedValueOnce({ data: mockResponse });

      const result = await usersController.disableUser(uuid);

      expect(result).toEqual(mockResponse);
      expect(mockPatch).toHaveBeenCalledWith(
        `/users/disable/${uuid}`,
        undefined
      );
    });
  });
});
