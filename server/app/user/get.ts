import { prisma } from "app/app";
import { authenticate, AuthenticationHeaders } from "app/authentication";
import { FastifyReply, FastifyRequest, RouteShorthandMethod, RouteShorthandOptions } from "fastify";
import { UserType } from "@ref/types/user";

export const GetUsersSchema: RouteShorthandOptions = {
    schema: {
        headers: AuthenticationHeaders
    }
}

interface GetUsersRequest extends FastifyRequest { }

export const GetUsersHandler = async (req: GetUsersRequest, reply: FastifyReply) => {
    const token = await authenticate(req, reply);

    if (token.user.userType != UserType.DM) {
        return [token.user];
    }

    let users = await prisma.user.findMany({
        select: {
            userType: true,
            id: true,
            authorized: true,
            name: true,
            password: true,
        }
    });

    return users;
}