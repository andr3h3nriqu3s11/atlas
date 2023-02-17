import { Token, User } from '@prisma/client';
import { prisma } from 'app/app';
import { FastifyReply, FastifyRequest } from 'fastify';

export const AuthenticationHeaders = {
	type: 'object',
	properties: {
		token: { type: 'string' }
	},
	required: ['token']
};

export const authenticate = async (
	req: FastifyRequest,
	rep: FastifyReply,
	token_pass: string | undefined = undefined
) => {
	const token = token_pass ?? req.headers.token;
	if (!token || Array.isArray(token)) {
		rep.code(401);
		throw new Error('invalid token');
	}
	const tokenDB = await prisma.token.findUnique({
		where: {
			token
		},
		select: {
			expireDate: true,
			token: true,
			user: {
				select: {
					authorized: true,
					id: true,
					name: true,
					userType: true
				}
			},
			userId: true
		}
	});
	if (!tokenDB) {
		rep.code(401);
		throw new Error('invalid token');
	}

	if (new Date().getTime() > tokenDB.expireDate.getTime()) {
		prisma.token.delete({ where: { token } });
		rep.code(401);
		throw new Error('invalid token');
	}

	return tokenDB;
};
