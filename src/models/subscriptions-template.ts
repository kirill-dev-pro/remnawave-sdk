export enum TemplateType {
  SINGBOX = "singbox",
  V2RAY = "v2ray",
  CLASH = "clash",
  OUTLINE = "outline",
}

export interface TemplateResponseDto {
  uuid: string;
  template_type: TemplateType;
  content: string;
  created_at: string;
  updated_at: string;
}

export interface UpdateTemplateRequestDto {
  template_type: TemplateType;
  content?: string;
}
