import { UpdateUserRequestBody, UserType} from '../../../types/user';
import { FastifyReply, FastifyRequest, RouteShorthandOptions } from "fastify";
import { prisma } from 'app/app';
import { error } from 'app/utils';
import { authenticate } from 'app/authentication';
import { SELECT_USER } from '.';

export const UpdateUserSchema: RouteShorthandOptions = {
    schema: {
        body: {
            type: 'object',
            required: ['name', 'password'],
            properties: {
                name: {type: 'string'},
                password: {type: 'string'},
            }
        }
    }
}

interface UpdateUserRequest extends FastifyRequest {
    body: UpdateUserRequestBody
}

export const UpdateUserHandler = async (req: UpdateUserRequest, reply: FastifyReply) => {

    const token = await authenticate(req, reply);

    const id = req.body.id ?? token.userId

    let user = token.user;

    if (!id) error(reply, 400, 'invalid id');

    if (token.userId != id) {
        if (token.user.userType != UserType.DM) error(reply, 403, 'You are a pleb');

        let s_user = await prisma.user.findUnique({where: {id}});

        if (!s_user) error(reply, 404, 'User not found')
    }

    user = await prisma.user.update({where: {id: id}, data: req.body, select: SELECT_USER});

    return user;
}