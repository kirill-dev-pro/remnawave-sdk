import { describe, expect, test, vi, beforeEach } from "vitest";
import { createMockedSDK } from "./test-setup";
import { RemnawaveSDK } from "../index";
import {
  CreateHostRequestDto,
  DeleteHostResponseDto,
  HostResponseDto,
  HostsResponseDto,
  ReorderHostRequestDto,
  ReorderHostResponseDto,
  UpdateHostRequestDto,
} from "../models/hosts";
import { generateRandomString } from "./utils";
import { TEST_INBOUND_UUID } from "../constants";

describe("HostsController", () => {
  let client: RemnawaveSDK;

  beforeEach(() => {
    client = createMockedSDK();
    vi.clearAllMocks();
  });

  test("should manage hosts", async () => {
    // Mock get all hosts response
    const mockHostsResponse = {
      hosts: [],
    };

    const getAllHostsSpy = vi.spyOn(client.hosts["client"], "get");
    getAllHostsSpy.mockResolvedValueOnce({ data: mockHostsResponse });

    // Test get all hosts
    const allHosts = await client.hosts.getAllHosts();

    // Verify API was called with the right path
    expect(getAllHostsSpy).toHaveBeenCalledWith("/hosts");

    // Verify response
    expect(allHosts).toEqual(mockHostsResponse);
    expect(allHosts).toHaveProperty("hosts");

    // Generate test data
    const randomIp = `${Math.floor(Math.random() * 300) + 500}.0.0.1`;
    const randomPort = Math.floor(Math.random() * 3000) + 5000;
    const randomRemark = generateRandomString();

    // Prepare mock host response
    const mockHost: HostResponseDto = {
      uuid: "test-host-uuid-123",
      inbound_uuid: TEST_INBOUND_UUID,
      address: randomIp,
      port: randomPort,
      remark: randomRemark,
      view_position: 0,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    // Mock create host response
    const createHostSpy = vi.spyOn(client.hosts["client"], "post");
    createHostSpy.mockResolvedValueOnce({ data: mockHost });

    // Test create host
    const createHostPayload = {
      inbound_uuid: TEST_INBOUND_UUID,
      address: randomIp,
      port: randomPort,
      remark: randomRemark,
    };

    const createHost = await client.hosts.createHost(createHostPayload);

    // Verify API was called with the right path and data
    expect(createHostSpy).toHaveBeenCalledWith("/hosts", createHostPayload);

    // Verify response
    expect(createHost).toEqual(mockHost);
    expect(createHost.inbound_uuid).toBe(TEST_INBOUND_UUID);
    expect(createHost.address).toBe(randomIp);
    expect(createHost.port).toBe(randomPort);
    expect(createHost.remark).toBe(randomRemark);

    // Mock get one host
    const getOneHostSpy = vi.spyOn(client.hosts["client"], "get");
    getOneHostSpy.mockResolvedValueOnce({ data: mockHost });

    // Test get one host
    const host = await client.hosts.getOneHost("test-host-uuid-123");

    // Verify API was called with the right path
    expect(getOneHostSpy).toHaveBeenCalledWith("/hosts/test-host-uuid-123");

    // Verify response
    expect(host).toEqual(mockHost);
    expect(host.uuid).toBe(mockHost.uuid);

    // Mock reorder hosts
    const reorderMockResponse = {
      is_updated: true,
    };

    const reorderHostsSpy = vi.spyOn(client.hosts["client"], "post");
    reorderHostsSpy.mockResolvedValueOnce({ data: reorderMockResponse });

    // Test reorder hosts
    const reorderPayload = [{ uuid: "test-host-uuid-123", view_position: 1 }];

    const reorderHost = await client.hosts.reorderHosts(reorderPayload);

    // Verify API was called with the right path and data
    expect(reorderHostsSpy).toHaveBeenCalledWith("/hosts/reorder", {
      hosts: reorderPayload,
    });

    // Verify response
    expect(reorderHost).toEqual(reorderMockResponse);
    expect(reorderHost.is_updated).toBe(true);

    // Mock update host
    const updatedMockHost = {
      ...mockHost,
      remark: "TEST_REMARK",
      alpn: "h3,h2",
      fingerprint: "android",
    };

    const updateHostSpy = vi.spyOn(client.hosts["client"], "post");
    updateHostSpy.mockResolvedValueOnce({ data: updatedMockHost });

    // Test update host
    const updatePayload = {
      uuid: "test-host-uuid-123",
      remark: "TEST_REMARK",
      alpn: "h3,h2",
      fingerprint: "android",
    };

    const updateHost = await client.hosts.updateHost(updatePayload);

    // Verify API was called with the right path and data
    expect(updateHostSpy).toHaveBeenCalledWith("/hosts/update", updatePayload);

    // Verify response
    expect(updateHost).toEqual(updatedMockHost);
    expect(updateHost.remark).toBe("TEST_REMARK");
    expect(updateHost.alpn).toBe("h3,h2");
    expect(updateHost.fingerprint).toBe("android");

    // Mock delete host
    const deleteMockResponse = {
      is_deleted: true,
    };

    const deleteHostSpy = vi.spyOn(client.hosts["client"], "delete");
    deleteHostSpy.mockResolvedValueOnce({ data: deleteMockResponse });

    // Test delete host
    const deleteHost = await client.hosts.deleteHost("test-host-uuid-123");

    // Verify API was called with the right path
    expect(deleteHostSpy).toHaveBeenCalledWith("/hosts/test-host-uuid-123");

    // Verify response
    expect(deleteHost).toEqual(deleteMockResponse);
    expect(deleteHost.is_deleted).toBe(true);
  });
});
