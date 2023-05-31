import { FastifyInstance, RouteHandlerMethod, RouteShorthandOptions } from "fastify";
import { typed, types, AuthenticationHeaders } from '.';

export class Requests {
    private handler: RouteHandlerMethod
    private _opts: RouteShorthandOptions
    private method: 'post' | 'get' | 'put' | 'delete' | 'patch';
    private uriExtra: string;

    constructor() {
        this.handler = () => {throw new Error("Not Implemented")};
        this.method = 'post';
        this.uriExtra = "";
        this._opts = { schema: {}};
    }

    uri(uri: string) {
        this.uriExtra = uri;
        return this;
    }

    handle(handler: RouteHandlerMethod) {
        this.handler = handler;
        return this;
    }

    opts(opts: RouteShorthandOptions) {
        this._opts = opts;
        return this;
    }

    description(desc: string) {
        this._opts.schema.description = desc;
        return this;
    }

    authHeaders() {
        this._opts.schema.headers = AuthenticationHeaders;
        return this;
    }

    tags(...tags: string[]) {
        this._opts.schema.tags = tags;
        return this;
    }

    body(body: typed<types>) {
        this._opts.schema.body = body;
        return this;
    }

    params(body: typed<types>) {
        this._opts.schema.params = body;
        return this;
    }

    post() {
        this.method = 'post';
        return this;
    }

    delete() {
        this.method = 'delete';
        return this;
    }

    get() {
        this.method = 'get';
        return this;
    }

    put() {
        this.method = 'put';
        return this;
    }

    patch() {
        this.method = 'patch';
        return this;
    }

    build(fastify: FastifyInstance, url: string) {
        fastify[this.method](url + this.uriExtra, this._opts, this.handler);
    }

}
