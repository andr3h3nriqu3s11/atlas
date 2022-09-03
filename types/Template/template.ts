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