import { prisma } from "app/app";
import { UpdateUserRequestBody, UserType } from "@ref/types/user";
import { Requests, T } from "app/utils";
import { FastifyRequest } from "fastify";

export const get = new Requests()
.description('End point used to list users')
.tags('User')
.uri('s')
.authHeaders()
.handle(async (req) => {
    const token = await req.authenticate();

    if (token.user.userType != UserType.DM)
        return [token.user];

    return await prisma.user.findMany({ select: SELECT_USER });
});

export const put = new Requests()
.description('End point used to update a user')
.tags('User')
.authHeaders()
.body(T.object({
    id: T.string(),
    name: T.string(),
}, {required: ['name']}))
.handle(async (req: FastifyRequest<{Body: UpdateUserRequestBody}>, reply) => {
    const {user} = await req.authenticate();
    const {body} = req;
    const id = body.id ?? user.id;
     
    if (!id) reply.error(400, 'invalid id');

    if (user.id != id) {
        if (user.userType != UserType.DM) 
            reply.error(403, 'You are a pleb');

        const s_user = await prisma.user.findUnique({where: {id}});

        if (!s_user) 
            reply.error(404, 'User not found')
    }

    return await prisma.user.update({where: {id: id}, data: req.body, select: SELECT_USER});
});

export const SELECT_USER = {
    userType: true,
    name: true,
    id: true,
    authorized: true
}
