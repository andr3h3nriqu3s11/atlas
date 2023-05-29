import { Hindrance, HindranceType, Rank, create_hindrance } from "@ref/types";
import { prisma } from "app/app";
import { Requests, T } from "app/utils";
import { FastifyRequest } from "fastify";
import { export_hindrance } from ".";

export const post = new Requests()
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
