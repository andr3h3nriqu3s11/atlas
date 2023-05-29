import { prisma } from "app/app";
import { Requests, T } from "app/utils";
import { FastifyRequest } from "fastify";
import { SELECT_USER } from ".";

export const get = new Requests()
.description('End point used to authorize a user')
.tags('User')
.authHeaders()
.uri('/:id')
.params(T.object({
    id: T.string()
}, {required: ['id']}))
.handle(async (req: FastifyRequest<{ Params: {id: string}}>, reply) => {
    await req.authenticate_dm();

    let user = await prisma.user.findUnique({where: {id: req.params.id}, select: SELECT_USER});

    if (!user) 
        reply.error(404, 'user not found');

    user = await prisma.user.update({select: SELECT_USER, where: {id: user.id}, data: {authorized: true}});

    return user;
});
