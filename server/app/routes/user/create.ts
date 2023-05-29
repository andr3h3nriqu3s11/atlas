import {CreateUserRequestBody, UserType} from '@ref/types/user';
import { FastifyRequest } from "fastify";
import { prisma } from 'app/app';
import argon2 from 'argon2';
import { T, Requests } from 'app/utils';

export const post = new Requests()
.description('End point used to create user')
.tags('User')
.body(T.object({
    name: T.string(),
    password: T.string(),
}, {required: ['name', 'password']}))
.handle(async (req: FastifyRequest<{ Body: CreateUserRequestBody}>, reply) => {
    const userCount = await prisma.user.count()

    let userType: UserType = UserType.PLEB;

    if (userCount === 0) userType = UserType.DM;

    const pass = await argon2.hash(req.body.password)

    try {
        const new_user = await prisma.user.create({
            data: {
                ...req.body,
                password: pass,
                authorized: userType === UserType.DM,
                userType: userType,
            },
            select: {
                id: true,
                name: true,
                authorized: true,
                userType: true
            }
        });

        return new_user;
    } catch (e) {
        if (e.code === 'P2002') reply.error(400, 'name already in use');
        reply.error(500, String(e));
    }
});
