import { describe, expect, it, beforeEach, vi } from "vitest";
import axios from "axios";
import { NodesController } from "../controllers/nodes";
import { NodeDto, NodeStatusDto } from "../controllers/nodes";
import {
  generateRandomString,
  generateRandomIp,
  generateRandomPort,
} from "./utils";

describe("NodesController", () => {
  let nodesController: NodesController;
  const mockedAxios = {
    post: vi.fn(() => Promise.resolve({ data: {} })),
    get: vi.fn(() => Promise.resolve({ data: {} })),
    put: vi.fn(() => Promise.resolve({ data: {} })),
    patch: vi.fn(() => Promise.resolve({ data: {} })),
    delete: vi.fn(() => Promise.resolve({ data: {} })),
  };

  beforeEach(() => {
    vi.clearAllMocks();
    nodesController = new NodesController(mockedAxios as any);
  });

  it("should fetch all nodes", async () => {
    const mockNodes: NodeDto[] = [
      {
        id: "node1",
        name: "Node 1",
        type: "type1",
        status: "active",
        createdAt: "2024-01-01T00:00:00Z",
        updatedAt: "2024-01-01T00:00:00Z",
      },
    ];

    mockedAxios.get.mockResolvedValueOnce({ data: mockNodes });

    const result = await nodesController.getNodes();

    expect(result).toEqual(mockNodes);
    expect(mockedAxios.get).toHaveBeenCalledWith("/nodes");
  });

  it("should fetch a node by id", async () => {
    const mockNode: NodeDto = {
      id: "node1",
      name: "Node 1",
      type: "type1",
      status: "active",
      createdAt: "2024-01-01T00:00:00Z",
      updatedAt: "2024-01-01T00:00:00Z",
    };

    mockedAxios.get.mockResolvedValueOnce({ data: mockNode });

    const result = await nodesController.getNode("node1");

    expect(result).toEqual(mockNode);
    expect(mockedAxios.get).toHaveBeenCalledWith("/nodes/node1");
  });

  it("should fetch node status", async () => {
    const mockStatus: NodeStatusDto = {
      status: "active",
      lastSeen: "2024-01-01T00:00:00Z",
    };

    mockedAxios.get.mockResolvedValueOnce({ data: mockStatus });

    const result = await nodesController.getNodeStatus("node1");

    expect(result).toEqual(mockStatus);
    expect(mockedAxios.get).toHaveBeenCalledWith("/nodes/node1/status");
  });

  it("should create a node", async () => {
    const mockNode: NodeDto = {
      id: "node1",
      name: "Node 1",
      type: "type1",
      status: "active",
      createdAt: "2024-01-01T00:00:00Z",
      updatedAt: "2024-01-01T00:00:00Z",
    };

    mockedAxios.post.mockResolvedValueOnce({ data: mockNode });

    const result = await nodesController.createNode({
      name: "Node 1",
      type: "type1",
    });

    expect(result).toEqual(mockNode);
    expect(mockedAxios.post).toHaveBeenCalledWith("/nodes", {
      name: "Node 1",
      type: "type1",
    });
  });

  it("should update a node", async () => {
    const mockNode: NodeDto = {
      id: "node1",
      name: "Updated Node 1",
      type: "type1",
      status: "active",
      createdAt: "2024-01-01T00:00:00Z",
      updatedAt: "2024-01-01T00:00:00Z",
    };

    mockedAxios.put.mockResolvedValueOnce({ data: mockNode });

    const result = await nodesController.updateNode("node1", {
      name: "Updated Node 1",
    });

    expect(result).toEqual(mockNode);
    expect(mockedAxios.put).toHaveBeenCalledWith("/nodes/node1", {
      name: "Updated Node 1",
    });
  });

  it("should delete a node", async () => {
    await nodesController.deleteNode("node1");
    expect(mockedAxios.delete).toHaveBeenCalledWith("/nodes/node1");
  });
});
