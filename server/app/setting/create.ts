import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { prisma } from "app/app";
import { error } from "app/utils";
import { requestBuilder } from "app/utils/requestBuilder";
import { FastifyRequest, RouteShorthandOptions } from "fastify";
import { CreateWorldSettingRequest } from '@ref/types/setting';

export const CreateSettingSchema: RouteShorthandOptions = {
	schema: {
		body: {
			type: 'object',
			required: ['name'],
			properties: {
				name: {type: 'string'}
			}
		}
	}	
};

interface CreateSettingRequest extends FastifyRequest {
	body: CreateWorldSettingRequest
}

export const CreateSettingHandler = requestBuilder(async (req: CreateSettingRequest, reply) => {
	try {
		let setting = await prisma.worldSetting.create({
			data: {
				name: req.body.name,
			}
		});
		return setting;
	} catch (e) {
		if (e instanceof PrismaClientKnownRequestError && e.code === 'P2002') error(reply, 400, 'Setting with that name already exists');
		throw e;
	}
}, {justDm: true, authenticate: true});