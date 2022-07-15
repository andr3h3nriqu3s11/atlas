export interface TemplateFieldsReturn {
	templateFields: TemplateFieldResponse[]
}

export enum TemplateFieldType {
	string = "STRING",
	number = "NUMBER",
	dropbox = "DROPBOX",
	boolean = "BOOLEAN"
}

export interface CreateTemplateFieldRequestBody {
  templateId: string,
  name: string;
  label: string;
  type: TemplateFieldType,
  value: string,
  defaultValue: string,
  max?: number,
  min?: number,
}

export interface UpdateTemplateFieldRequestBody {
  name?: string;
  label?: string;
  type?: TemplateFieldType,
  value?: string,
  defaultValue?: string,
  max?: number,
  min?: number,
}

export interface TemplateFieldResponse {
  id: string,
  templateId: string,
  name: string,
  label: string,
  type: TemplateFieldType,
  value: string,
  defaultValue: string,
  max?: number,
  min?: number,
}
