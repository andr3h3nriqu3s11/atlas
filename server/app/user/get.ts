import { prisma } from "app/app";
import { authenticate, AuthenticationHeaders } from "app/authentication";
import { FastifyReply, FastifyRequest, RouteShorthandOptions } from "fastify";
import { UserType } from "@ref/types/user";

export const GetUsersSchema: RouteShorthandOptions = {
    schema: {
        description: 'End point used to list users',
        tags: ['User'],
        headers: AuthenticationHeaders
    }
}

export const GetUsersHandler = async (req: FastifyRequest, reply: FastifyReply) => {
    const token = await authenticate(req, reply);

    if (token.user.userType != UserType.DM) {
        return [token.user];
    }

    return await prisma.user.findMany({
        select: {
            userType: true,
            id: true,
            authorized: true,
            name: true,
            password: true,
        }
    });
}
