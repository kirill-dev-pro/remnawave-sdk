import { describe, expect, it, beforeEach, vi } from "vitest";
import axios from "axios";
import { SystemController } from "../controllers/system";
import { SystemInfoDto, SystemSettingsDto } from "../controllers/system";

describe("SystemController", () => {
  let systemController: SystemController;
  const mockedAxios = {
    post: vi.fn(() => Promise.resolve({ data: {} })),
    get: vi.fn(() => Promise.resolve({ data: {} })),
    put: vi.fn(() => Promise.resolve({ data: {} })),
    patch: vi.fn(() => Promise.resolve({ data: {} })),
    delete: vi.fn(() => Promise.resolve({ data: {} })),
  };

  beforeEach(() => {
    vi.clearAllMocks();
    systemController = new SystemController(mockedAxios as any);
  });

  it("should fetch system info", async () => {
    const mockSystemInfo: SystemInfoDto = {
      version: "1.0.0",
      uptime: 3600,
      memory: {
        total: 1024,
        used: 512,
        free: 512,
      },
      cpu: {
        usage: 50,
        cores: 4,
      },
    };

    mockedAxios.get.mockResolvedValueOnce({ data: mockSystemInfo });

    const result = await systemController.getSystemInfo();

    expect(result).toEqual(mockSystemInfo);
    expect(mockedAxios.get).toHaveBeenCalledWith("/system/info");
  });

  it("should fetch system settings", async () => {
    const mockSystemSettings: SystemSettingsDto = {
      logLevel: "info",
      maxConnections: 100,
      timeout: 30,
    };

    mockedAxios.get.mockResolvedValueOnce({ data: mockSystemSettings });

    const result = await systemController.getSystemSettings();

    expect(result).toEqual(mockSystemSettings);
    expect(mockedAxios.get).toHaveBeenCalledWith("/system/settings");
  });

  it("should restart the system", async () => {
    await systemController.restartSystem();
    expect(mockedAxios.post).toHaveBeenCalledWith("/system/restart");
  });

  it("should shutdown the system", async () => {
    await systemController.shutdownSystem();
    expect(mockedAxios.post).toHaveBeenCalledWith("/system/shutdown");
  });
});
