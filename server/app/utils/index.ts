import { FastifyReply } from "fastify";
import { T } from './schema_builder';
export * from './schema_builder';
export * from './requests';

/**
    * @deprecated use the one on the request
*/
export const error = (reply: FastifyReply, code: number, msg?: string) => {
    reply.code(code);
    throw new Error(msg ?? 'internal error');
}

export const AuthenticationHeaders = T.object({ token: T.string() }, {required: ['token']});
