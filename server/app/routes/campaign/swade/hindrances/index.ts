import { SWADE_Hindrances } from "@prisma/client";
import { CampaignType, CampaignTyped, Hindrance, HindranceType, Rank, create_hindrance, update_hindrance } from "@ref/types";
import { prisma } from "app/app";
import { Requests, T } from "app/utils";
import { FastifyRequest } from "fastify";

export const post = new Requests()
.authHeaders()
.description('Endpoint used to list a swade edges')
.tags('Hindrance', 'Swade')
.body(T.object({
    type: T.enumO(CampaignType)
}))
.handle(async (req: FastifyRequest<{Body: CampaignTyped}>, reply): Promise<Hindrance[]> => {
    await req.authenticate();

    const {body} = req;

    if (body.type === CampaignType.SWADE) {
        const skills = await prisma.sWADE_Hindrances.findMany({ });
        return skills.map(export_hindrance);
    } else reply.error(400, 'Invalid type');
});

export const patch = new Requests()
.authHeaders()
.description('Update swade hindrance')
.tags('Hindrance', 'Swade')
.body(T.object({
    title: T.string(),
    description: T.string(),
    type: T.enumO(HindranceType),
    id: T.string(),
}, {required: ['id']}))
.handle(async (req: FastifyRequest<{Body: update_hindrance}>, reply): Promise<Hindrance> => {
    await req.authenticate_dm();
    const {body: data} = req;

    const skill = await prisma.sWADE_Hindrances.findUnique({ where: { id: data.id } });

    if (!skill)
        reply.error(404, 'Hindrance not found');

    if (data.title) {
        const find_skill = await prisma.sWADE_Hindrances.findFirst({
            where: {
                title: data.title
            }
        });
        if (find_skill)
            reply.error(400, 'a edge with this title already exists');
    }

    const result = await prisma.sWADE_Hindrances.update({
        where: { id: data.id }, 
        data,
    });

    return export_hindrance(result);
});

export const del = new Requests()
.authHeaders()
.description('Delete swade hindrance')
.tags('Hindrance', 'Swade')
.body(T.object({
    id: T.string(),
}))
.handle(async (req: FastifyRequest<{Body: {id: string}}>, reply): Promise<Record<string, string>> => {
    await req.authenticate_dm();
    const {body: data} = req;

    const skill = await prisma.sWADE_Hindrances.findUnique({ where: { id: data.id } });
    if (!skill) reply.error(404, 'Hindrance not found');

    await prisma.sWADE_Hindrances.delete({ where: { id: skill.id, } });

    return {};
});

export const export_hindrance = (hindrance: SWADE_Hindrances): Hindrance => ({
    id: hindrance.id,
    title: hindrance.title,
    description: hindrance.description,
    type: hindrance.type as HindranceType,
});

export const put = new Requests()
.authHeaders()
.description('Endpoint used to add a swade hindrance')
.tags('Hindrance', 'Swade')
.body(T.object({
    title: T.string(),
    rank: T.enumO(Rank),
    description: T.string(),
    type: T.enumO(HindranceType)
}))
.handle(async (req: FastifyRequest<{Body: create_hindrance}>, reply): Promise<Hindrance> => {
    await req.authenticate_dm();
    const {body} = req;

    const list_hindrance = await prisma.sWADE_Hindrances.count({ where: { title: body.title, } });

    if (list_hindrance !== 0)
        reply.error(400, 'A hindrance with that name already exists');

    const hindrance = await prisma.sWADE_Hindrances.create({
        data: {
            title: body.title,
            description: body.description,
            type: body.type,
        },
    });

    return export_hindrance(hindrance);
})
