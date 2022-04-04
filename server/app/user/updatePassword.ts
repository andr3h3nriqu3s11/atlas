import { UpdatePasswordUserRequestBody, UpdateUserRequestBody, UserType} from '@types/user';
import { FastifyReply, FastifyRequest, RouteShorthandOptions } from "fastify";
import { prisma } from 'app/app';
import { error } from 'app/utils';
import { authenticate } from 'app/authentication';
import { SELECT_USER } from '.';
import { randomBytes } from 'crypto';
import argon2 from 'argon2'

export const UpdatePasswordUserSchema: RouteShorthandOptions = {
    schema: {
        body: {
            type: 'object',
            required: ['oldPassword', 'password'],
            properties: {
                oldPassword: {type: 'string'},
                password: {type: 'string'},
            }
        }
    }
}

interface UpdatePasswordUserRequest extends FastifyRequest {
    body: UpdatePasswordUserRequestBody
}

export const UpdatePasswordUserHandler = async (req: UpdatePasswordUserRequest, reply: FastifyReply) => {
    const token = await authenticate(req, reply);

	const body = req.body;

	const expireTime = new Date();
	expireTime.setSeconds(
		expireTime.getSeconds() + (body.expire ?? 24 * 60 * 60)
	);

	const tokenStr = randomBytes(64).toString('base64');

    let getUser = await prisma.user.findUnique({where: {id: token.userId} })

	try {
		const result = await argon2.verify(getUser.password, body.oldPassword);
		if (!result) throw new Error();
	} catch { error(reply, 401, 'email or password are invalid'); }

	//Remove the salt and password from the user object
	delete getUser.password;

    await prisma.token.deleteMany({where: {userId: token.userId}});

	try {
		await prisma.token.create({
			data: {
				expireDate: expireTime.toISOString(),
				token: tokenStr,
				userId: getUser.id
			}
		});
	} catch (e) { error(reply, 401, 'cloud not perform login') }

    let pass = await argon2.hash(req.body.password)

    let nUser = await prisma.user.update({where: {id: token.userId}, data: {password: pass}, select: SELECT_USER});

	return {
		user: nUser,
		token: tokenStr
	};
}