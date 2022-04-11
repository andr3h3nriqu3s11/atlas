import { CreateWorldSettingRequest } from "@ref/types/setting";
import { prisma } from "app/app";
import { error } from "app/utils";
import { requestBuilder } from "app/utils/requestBuilder";
import { FastifyRequest, RouteShorthandOptions } from "fastify";

export const UpdateSettingSchema: RouteShorthandOptions = {
	schema: {
		params: {
			type: 'object',
			required: ['id'],
			properties: {
				id: {type: 'string'}
			}
		},
		body: {
			type: 'object',
			required: ['name'],
			properties: {
				name: {type: 'string'}
			}
		}
	}
}

interface UdpateSettingRequest extends FastifyRequest {
	params: {
		id: string
	},
	body: CreateWorldSettingRequest
} 

export const UpdateSettingHandler = requestBuilder(async (req: UdpateSettingRequest, reply) => {

	let data = await prisma.worldSetting.update({
		data: req.body,
		where: {
			id: req.params.id
		}
	});

	if (!data) error(reply, 404, 'World Setting not found');

	return data;

}, {authenticate: true, justDm: true} )