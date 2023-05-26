import { User } from '@prisma/client';
import { prisma } from 'app/app';
import argon2 from 'argon2';
import { randomBytes } from 'crypto';
import { FastifyReply, FastifyRequest, RouteShorthandOptions } from 'fastify';
import { LoginUserRequest } from '@ref/types/user';

interface UserLoginRequest extends FastifyRequest {
	body: LoginUserRequest
}

export const UserLoginSchema: RouteShorthandOptions = {
	schema: {
        description: 'End point used to login user',
        tags: ['User'],
		body: {
			type: 'object',
			required: ['name', 'password'],
			properties: {
				name: { type: 'string' },
				password: { type: 'string' },
				expire: { type: 'number' }
			}
		}
	}
};

/**
 * This functions deals with login in the user
 */
export const UserLoginHandler = async (
	req: UserLoginRequest,
	reply: FastifyReply
) => {
	const body = req.body;

	const expireTime = new Date();
	expireTime.setSeconds(
		expireTime.getSeconds() + (body.expire ?? 24 * 60 * 60)
	);

	const tokenStr = randomBytes(64).toString('base64');

	let getUser: User;
	try {
		getUser = await prisma.user.findUnique({
			where: {
                name: req.body.name,
			}
		});
	} catch { reply.error(401, 'could not perform login') }

	if (!getUser) 
        reply.error(401, 'email or password are invalid');

	try {
		const result = await argon2.verify(getUser.password, body.password);
		if (!result) throw new Error();
	} catch { reply.error(401, 'email or password are invalid'); }

	//Remove the salt and password from the user object
	delete getUser.password;

	try {
		await prisma.token.create({
			data: {
				expireDate: expireTime.toISOString(),
				token: tokenStr,
				userId: getUser.id
			}
		});
	} catch (e) { reply.error(401, 'cloud not perform login') }

	return {
		user: getUser,
		token: tokenStr
	};
};
