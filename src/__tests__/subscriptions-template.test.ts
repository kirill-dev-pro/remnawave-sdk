import { describe, expect, test, vi, beforeEach } from "vitest";
import { createMockedSDK } from "./test-setup";
import { RemnawaveSDK } from "../index";
import {
  TemplateResponseDto,
  TemplateType,
  UpdateTemplateRequestDto,
} from "../models/subscriptions-template";

describe("SubscriptionsTemplateController", () => {
  let client: RemnawaveSDK;

  beforeEach(() => {
    client = createMockedSDK();
    vi.clearAllMocks();
  });

  test("should get and update template", async () => {
    // Setup mock data
    const templateType = TemplateType.SINGBOX;
    const mockTemplate = {
      uuid: "template-uuid-123",
      template_type: templateType,
      content: "Template content",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    // Mock get template response
    const getTemplateSpy = vi.spyOn(
      client.subscriptions_template["client"],
      "get"
    );
    getTemplateSpy.mockResolvedValueOnce({ data: mockTemplate });

    // Test get template
    const template = await client.subscriptions_template.getTemplate(
      templateType
    );

    // Verify API was called with the right path
    expect(getTemplateSpy).toHaveBeenCalledWith(
      `/subscription/template/${templateType}`
    );

    // Verify response
    expect(template).toEqual(mockTemplate);
    expect(template).toHaveProperty("uuid");
    expect(template).toHaveProperty("template_type");
    expect(template).toHaveProperty("content");
    expect(template.template_type).toBe(templateType);
    expect(template.content).toBe(mockTemplate.content);

    // Mock update template response
    const updatedContent = "Updated template content";
    const updatedTemplate = {
      ...mockTemplate,
      content: updatedContent,
      updated_at: new Date().toISOString(),
    };

    const updateTemplateSpy = vi.spyOn(
      client.subscriptions_template["client"],
      "post"
    );
    updateTemplateSpy.mockResolvedValueOnce({ data: updatedTemplate });

    // Test update template
    const updateRequest: UpdateTemplateRequestDto = {
      template_type: templateType,
      content: updatedContent,
    };

    const result = await client.subscriptions_template.updateTemplate(
      updateRequest
    );

    // Verify API was called with the right path and data
    expect(updateTemplateSpy).toHaveBeenCalledWith(
      "/subscription/template",
      updateRequest
    );

    // Verify response
    expect(result).toEqual(updatedTemplate);
    expect(result).toHaveProperty("uuid");
    expect(result.template_type).toBe(templateType);
    expect(result.content).toBe(updatedContent);
  });
});
