import { FastifyInstance } from "fastify"
import { AuthorizeUserHandler, AuthorizeUserSchema } from "./authorize";
import { CreateUserHandler, CreateUserSchema } from "./create";
import { GetUsersHandler, GetUsersSchema } from "./get";
import { UserLoginHandler, UserLoginSchema } from "./login";
import { UpdateUserHandler, UpdateUserSchema } from "./update";
import { UpdatePasswordUserHandler, UpdatePasswordUserSchema } from "./updatePassword";

 
export const setUpUser = (bUrl: string, fastify: FastifyInstance) => {
    const url = `${bUrl}/user`;

    fastify.post(`${url}/create`, CreateUserSchema, CreateUserHandler);
    fastify.post(`${url}/login`, UserLoginSchema, UserLoginHandler);

    fastify.get(`${url}s`, GetUsersSchema, GetUsersHandler);
    fastify.get(`${url}/auth/:id`, AuthorizeUserSchema, AuthorizeUserHandler);

    fastify.put(`${url}`, UpdateUserSchema, UpdateUserHandler);
    fastify.put(`${url}/pass`, UpdatePasswordUserSchema, UpdatePasswordUserHandler);
}

export const SELECT_USER = {
    userType: true,
    name: true,
    id: true,
    authorized: true
}