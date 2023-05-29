import { CreateEdge, Edge, Rank } from "@ref/types";
import { prisma } from "app/app";
import { swade_export_edge } from "app/campaigns/characters/SWADE_Utils";
import { Requests } from "app/utils";
import { T } from 'app/utils';
import { FastifyRequest } from "fastify";

export const post = new Requests()
.authHeaders()
.description('Endpoint used to add a swade edge')
.tags('Edge', 'Swade')
.body(T.object({
    title: T.string(),
    rank: T.enum(Object.values(Rank)),
    description: T.string(),
}, {required: ['title', 'rank', 'description']}))
.handle(async (req: FastifyRequest<{Body: CreateEdge}>, reply): Promise<Edge> => {
    await req.authenticate_dm();
    const {body} = req;

    if (await prisma.sWADE_Edge.findFirst({ where: { title: body.title, } })) 
        reply.error(400, 'A edge with that name already exists');

    return swade_export_edge(await prisma.sWADE_Edge.create({
        data: {
            title: body.title,
            rank: body.rank,
            description: body.description
        },
        include: {
            requirements: {
                include: {
                    edge: true,
                    skill: true
                }
            }
        }
    }));
})
