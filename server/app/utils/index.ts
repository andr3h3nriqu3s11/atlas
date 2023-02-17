import { FastifyReply } from "fastify";

export const error = (reply: FastifyReply, code: number, msg?: string) => {
    reply.code(code);
    throw new Error(msg ?? 'internal error');
}
