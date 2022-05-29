export enum TemplateType {
	Item = "ITEM",
	Character = "CHARACTER",
}

export interface CreateTemplateRequestBody {
	worldSettingId: string,
	type: TemplateType,
	name: string,
	description?: string
}

export interface UpdateTemplateRequestBody {
	worldSettingId?: string,
	type?: TemplateType,
	name?: string,
	description?: string
}

export interface TemplateReturn {
	id: string,
	worldSettingId: string,
	type: TemplateType,
	name: string,
	description?: string
}

export interface TemplateFieldsReturn extends TemplateReturn {
	templateFields: TemplateFieldResponse[]
}

export enum TemplateFieldType {
	string = "STRING",
	number = "NUMBER",
	dropbox = "DROPBOX",
	boolean = "BOOLEAN"
}

export interface TemplateFieldResponse {
  id: string,
  templateId: string,
  type: TemplateFieldType,
  value: string,
  defaultValue: string,
  max?: number,
  min?: number,
}
