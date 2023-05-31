import Fastify, {FastifyReply, FastifyRequest} from "fastify";
import path from "path";
import fs from "fs";
import fastifyStatic from "@fastify/static";
import { frontendPath } from "./constants";
import { PrismaClient, Campaign } from "@prisma/client";
import { UserType } from "@ref/types/user";
import { FastifyDynamicSwaggerOptions } from "@fastify/swagger";
import { setUpCampaingns } from "./campaigns";
import { CampaignStatus } from "@ref/types";
import { Requests } from "./utils";

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

        reply.error = (status: number, message: string) => {
            reply.code(status);
            throw new Error(message);
        }
        
        req.authenticate = 
            async (token_pass: string | undefined = undefined) => 
                authenticate(req, reply, token_pass)

        req.authenticate_dm = 
            async (token_pass: string | undefined = undefined) => {

                const tokenDB = await authenticate(req, reply, token_pass);

                if (tokenDB.user.userType === UserType.DM)
                    return tokenDB;

                reply.error(401, 'Needs to be an dm');
            }

        req.authenticate_verifyCampaign = async (id: string, verify_type = true, token_pass: string | undefined = undefined) => {
            const token = await req.authenticate(token_pass);

            const campaign = await prisma.campaign.findUnique({
                where: {
                    id: id
                }
            });

            if (!campaign) 
                reply.error(404, 'Campaign not found');

            if (verify_type && campaign.status !== CampaignStatus.character_editing_mode && token.user.userType == UserType.PLEB)
                reply.error(401, 'You can do this in playing mode if you are not the dm');

            return {token, campaign};
        }

        done();
    });

    fastify.get(`${baseUrl}/`, async () => {
        return {
            version: `0.0.1`,
        };
    });

    try {
        const generalBasePath = './app/routes';
        const routes = fs.readdirSync(generalBasePath, {recursive: false, withFileTypes: true});
        
        const checkPath = async (basePath: string, path: fs.Dirent) => {
            if (path.isDirectory()) {
                const routes = fs.readdirSync(`${basePath}/${path.name}`, {withFileTypes: true});
                
                for (const route of routes) {
                    checkPath(`${basePath}/${path.name}`, route);
                }
                return;
            }

            if(!path.name.endsWith(".ts"))
                return;

            try {
                const v = await import(`${basePath.replace('./app', '.')}/${path.name}`);
                
                let uri = `${basePath.replace(generalBasePath, '')}/${path.name.replace(/.ts$/, '')}`;

                if (path.name === 'index.ts') 
                    uri = basePath.replace(generalBasePath, '');
                
                if (v.post instanceof Requests)
                    v.post.post().build(fastify, uri);
                if (v.get instanceof Requests)
                    v.get.get().build(fastify, uri);
                if (v.put instanceof Requests)
                    v.put.put().build(fastify, uri);
                if (v.del instanceof Requests)
                    v.del.delete().build(fastify, uri);
                if (v.patch instanceof Requests)
                    v.patch.patch().build(fastify, uri);

            } catch (e) {
                console.log("Failed to load file");
            }
        }


        for (const route of routes) {
            await checkPath(generalBasePath, route);
        }
    } catch (e) {
        console.log("Faield to load auto routes");
    }

    setUpCampaingns(fastify, baseUrl);

    await fastify.ready();

    fastify.swagger();

    return fastify;
};

export interface TokenDBUser {
    authorized: boolean;
    id: string;
    name: string;
    userType: string;
}

export interface TokenDB {
    user: TokenDBUser;
    token: string;
    expireDate: Date;
    userId: string;
}

declare module 'fastify' {
  interface FastifyRequest {
    authenticate: (token_pass?: string) => Promise<TokenDB>
    authenticate_dm: (token_pass?: string) => Promise<TokenDB>
    authenticate_verifyCampaign: (id: string, verify_type?: boolean, token_pass?: string) => Promise<{token: TokenDB, campaign: Campaign}>
  }
  interface FastifyReply {
    error: (status: number, message: string) => never
  }
}

const authenticate = async (
	req: FastifyRequest,
	rep: FastifyReply,
	token_pass: string | undefined = undefined
) => {
	const token = token_pass ?? req.headers.token;
	if (!token || Array.isArray(token)) 
        rep.error(401, 'token needed')
	const tokenDB = await prisma.token.findUnique({
		where: {
			token
		},
		select: {
			expireDate: true,
			token: true,
			user: {
				select: {
					authorized: true,
					id: true,
					name: true,
					userType: true
				}
			},
			userId: true
		}
	});
	if (!tokenDB) 
        rep.error(401, 'invalid token');

	if (new Date().getTime() > tokenDB.expireDate.getTime()) {
		prisma.token.delete({ where: { token } });
        rep.error(401, 'token expired');
	}

	return tokenDB;
};
