import { prisma } from "app/app";
import { error } from "app/utils";
import { requestBuilder } from "app/utils/requestBuilder";
import { FastifyRequest, RouteShorthandOptions } from "fastify";

export const DeleteSettingSchema: RouteShorthandOptions = {
	schema: {
		params: {
			type: 'object',
			required: ['id'],
			properties: {
				id: {type: "string"}
			}
		}
	}
};

interface DeleteSettingRequest extends FastifyRequest {
	params: {
		id: string;
	}
}

export const DeleteSettingHandler = requestBuilder(async (req: DeleteSettingRequest, reply) => {

	let r = await prisma.worldSetting.delete({
		where: {
			id: req.params.id
		}
	});

	if (!r) error(reply, 404, "Setting not found");

	return r;

}, {authenticate: true, justDm: true})