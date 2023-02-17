import Fastify, {FastifyRequest} from "fastify";
import path from "path";
import fastifyStatic from "@fastify/static";
import { frontendPath } from "./constants";
import { PrismaClient } from "@prisma/client";
import { setUpUser } from "./user";
import { authenticate } from "./authentication";
import { UserType } from "@ref/types/user";
import { FastifyDynamicSwaggerOptions } from "@fastify/swagger";
import { setUpCampaingns } from "./campaigns";

export const prisma = new PrismaClient();

export const buildServer = async (code: string) => {
    const fastify = Fastify();

    const baseUrl = "";
    
    await fastify.register(import('@fastify/swagger'),{
        swagger: {
            info: {
                title: "Atlas",
                description: "Swagger interface for atlas",
            },
            tags: [
                {name: 'User', description: 'User related endpoints'},
                {name: 'Campaign', description: 'Campaign related endpoints'}
            ]
        },
    } as FastifyDynamicSwaggerOptions);

    await fastify.register(import('@fastify/swagger-ui'), {
        routePrefix: '/docs',
        uiConfig: {
            docExpansion: 'none',
        }
    });

    fastify.register(import("@fastify/cors"), { origin: "*" });

    fastify.register(fastifyStatic, {
        root: path.join(__dirname, frontendPath),
        prefix: "/app/",
        index: ["index.html"],
    });

    // Adds the authenticate funcions to the request field
    fastify.addHook('preHandler', (req: FastifyRequest, reply, done) => {
        
        req.authenticate = 
            async (token_pass: string | undefined = undefined) => 
                authenticate(req, reply, token_pass)

        req.authenticate_dm = 
            async (token_pass: string | undefined = undefined) => {

                const tokenDB = await authenticate(req, reply, token_pass);

                if (tokenDB.user.userType === UserType.DM)
                    return tokenDB;

                reply.code(401);
                throw new Error('Needs to be an dm');
            }

        done();
    });

    fastify.get(`${baseUrl}/`, async () => {
        return {
            version: `0.0.1`,
        };
    });

    setUpUser(baseUrl, fastify);

    setUpCampaingns(fastify, baseUrl);

    await fastify.ready();

    fastify.swagger();

    return fastify;
};

interface TokenDB {
    user: {
        authorized: boolean;
        id: string;
        name: string;
        userType: string;
    };
    token: string;
    expireDate: Date;
    userId: string;
}

declare module 'fastify' {
  export interface FastifyRequest {
    authenticate: (token_pass?: string) => Promise<TokenDB>
    authenticate_dm: (token_pass?: string) => Promise<TokenDB>
  }
}
