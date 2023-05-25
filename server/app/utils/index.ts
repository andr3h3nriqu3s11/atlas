import { FastifyReply } from "fastify";

/**
    * @deprecated use the one on the request
*/
export const error = (reply: FastifyReply, code: number, msg?: string) => {
    reply.code(code);
    throw new Error(msg ?? 'internal error');
}
