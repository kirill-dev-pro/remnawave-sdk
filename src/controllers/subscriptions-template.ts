import { BaseController } from "./base";
import {
  TemplateResponseDto,
  TemplateType,
  UpdateTemplateRequestDto,
} from "../models/subscriptions-template";

export class SubscriptionsTemplateController extends BaseController {
  async getTemplate(templateType: TemplateType): Promise<TemplateResponseDto> {
    return this.get<TemplateResponseDto>(
      `/subscription/template/${templateType}`
    );
  }

  async updateTemplate(
    body: UpdateTemplateRequestDto
  ): Promise<TemplateResponseDto> {
    return this.post<TemplateResponseDto>("/subscription/template", body);
  }
}
