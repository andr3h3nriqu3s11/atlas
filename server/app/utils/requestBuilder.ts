import { FastifyRequest, FastifyReply } from "fastify";
import { authenticate as authenticateFn} from 'app/authentication';
import { UserType } from "@ref/types/user";
import { error } from '.';

type BaseF<T extends FastifyRequest, R> = (req: T, reply: FastifyReply) => Promise<R>;

type Options = {
	authenticate?: boolean, 
	justDm?: boolean
}

type Unwrap<T> =
	T extends Promise<infer U> ? U :
	T extends (...args: any) => Promise<infer U> ? U :
	T extends (...args: any) => infer U ? U :
	T
 
type BaseFR<T extends FastifyRequest, R, O extends Options> = 
	O["authenticate"] extends true ? 
		(req: T, reply: FastifyReply, token: Unwrap<ReturnType<typeof authenticateFn>>) => Promise<R> :
		BaseF<T, R>;

export const requestBuilder = <T extends FastifyRequest, R, O extends Options>(fn: BaseFR<T, R, O>, options?: O): BaseF<T, R> => {

	let {authenticate = false, justDm = false} = options ?? {};

	return async (req: T, reply: FastifyReply) => {

		if (authenticate) {
			let token = await authenticateFn(req, reply);

			if (justDm && token.user.userType === UserType.PLEB) 
				error(reply, 403, 'you are not authorized to do this');

			return fn(req, reply, token);
		}

		return fn(req, reply, undefined);
	}
}