import { describe, expect, it, beforeEach, vi } from "vitest";
import axios from "axios";
import { AuthController } from "../controllers/auth";
import { LoginRequestDto, LoginResponseDto } from "../controllers/auth";

describe("AuthController", () => {
  let authController: AuthController;
  const mockedAxios = {
    post: vi.fn(() => Promise.resolve({ data: {} })),
    get: vi.fn(() => Promise.resolve({ data: {} })),
    put: vi.fn(() => Promise.resolve({ data: {} })),
    patch: vi.fn(() => Promise.resolve({ data: {} })),
    delete: vi.fn(() => Promise.resolve({ data: {} })),
  };

  beforeEach(() => {
    vi.clearAllMocks();
    authController = new AuthController(mockedAxios as any);
  });

  it("should login successfully", async () => {
    const mockLoginData: LoginRequestDto = {
      username: "admin",
      password: "admin123",
    };

    const mockResponse: LoginResponseDto = {
      token: "test-token",
    };

    mockedAxios.post.mockResolvedValueOnce({ data: mockResponse });

    const result = await authController.login(mockLoginData);

    expect(result).toEqual(mockResponse);
    expect(mockedAxios.post).toHaveBeenCalledWith("/auth/login", mockLoginData);
  });

  it("should logout successfully", async () => {
    await authController.logout();
    expect(mockedAxios.post).toHaveBeenCalledWith("/auth/logout");
  });

  it("should refresh token successfully", async () => {
    const mockResponse: LoginResponseDto = {
      token: "new-test-token",
    };

    mockedAxios.post.mockResolvedValueOnce({ data: mockResponse });

    const result = await authController.refreshToken();

    expect(result).toEqual(mockResponse);
    expect(mockedAxios.post).toHaveBeenCalledWith("/auth/refresh");
  });
});
