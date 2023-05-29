import { UpdatePasswordUserRequestBody } from '@ref/types/user';
import { FastifyRequest } from "fastify";
import { prisma } from 'app/app';
import { Requests, T } from 'app/utils';
import { SELECT_USER } from '.';
import { randomBytes } from 'crypto';
import argon2 from 'argon2'

export const put = new Requests()
.description('End point used to password a user')
.tags('User')
.authHeaders()
.body(T.object({
    oldPassword: T.string(),
    password: T.string(),
    expire: T.number(24 * 60 * 60),
}, {required: ['oldPassword', 'password']}))
.handle(async (req: FastifyRequest<{ Body: UpdatePasswordUserRequestBody }>, reply) => {
    const token = await req.authenticate();
	const body = req.body;

	const expireTime = new Date();
	expireTime.setSeconds(
		expireTime.getSeconds() + (body.expire ?? 24 * 60 * 60)
	);

	const tokenStr = randomBytes(64).toString('base64');

    const getUser = await prisma.user.findUnique({where: {id: token.userId} })

	try {
		const result = await argon2.verify(getUser.password, body.oldPassword);
		if (!result) throw new Error();
	} catch { reply.error(401, 'email or password are invalid'); }

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
	} catch (e) { reply.error(401, 'cloud not perform login') }

    const pass = await argon2.hash(req.body.password)

    const nUser = await prisma.user.update({
        where: {id: token.userId}, 
        data: {password: pass}, 
        select: SELECT_USER});

	return {
		user: nUser,
		token: tokenStr
	};
})
