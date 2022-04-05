import {CreateUserRequestBody, UserType} from '@ref/types/user';
import { FastifyReply, FastifyRequest, RouteShorthandOptions } from "fastify";
import { prisma } from 'app/app';
import argon2 from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { error } from 'app/utils';

export const CreateUserSchema: RouteShorthandOptions = {
    schema: {
        body: {
            type: 'object',
            properties: {
                id: {type: 'string'},
                name: {type: 'string'},
            }
        }
    }
}

interface CreateUserRequest extends FastifyRequest {
    body: CreateUserRequestBody
}

export const CreateUserHandler = async (req: CreateUserRequest, reply: FastifyReply) => {

    const userCount = await prisma.user.count()

    let userType: UserType = UserType.PLEB;

    if (userCount === 0) {
        userType = UserType.DM;
    }

    let pass = await argon2.hash(req.body.password)

    try {
        let new_user = await prisma.user.create({
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
        if (e instanceof PrismaClientKnownRequestError && e.code === 'P2002') error(reply, 400, 'name already in use');
        error(reply, 500);
    }
}