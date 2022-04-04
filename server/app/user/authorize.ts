import { prisma } from "app/app";
import { authenticate, AuthenticationHeaders } from "app/authentication";
import { error } from "app/utils";
import { FastifyReply, FastifyRequest, RouteShorthandOptions } from "fastify";
import { SELECT_USER } from ".";
import { UserType } from "@types/user";

export const AuthorizeUserSchema: RouteShorthandOptions = {
    schema: {
        headers: AuthenticationHeaders,
        params: {
            type: 'object',
            required: ['id'],
            properties: {
                id: {type: 'string'}
            }
        }
    }
}

interface AuthorizeUserRequest extends FastifyRequest {
    params: {
        id: string
    }
}

export const AuthorizeUserHandler = async (req: AuthorizeUserRequest, reply: FastifyReply) => {
    const token = await authenticate(req, reply);

    if (token.user.userType != UserType.DM) error(reply, 403, 'not authorized');

    let user = await prisma.user.findUnique({where: {id: req.params.id}, select: SELECT_USER});

    if (!user) error(reply, 404, 'user not found');

    user = await prisma.user.update({select: SELECT_USER, where: {id: user.id}, data: {authorized: true}});

    return user;
}