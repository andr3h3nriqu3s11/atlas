import { CampaignType, CharacterNote, Campaign, CharacterInteraction } from "@ref/types";
import { prisma } from "app/app";
import { AuthenticationHeaders } from "app/utils";
import { T } from "app/utils/schema_builder";
import { FastifyInstance, FastifyRequest } from "fastify";
import { swade_export_character_note } from "../SWADE_Utils";

export function list (fastify: FastifyInstance, url: string) {
    fastify.post(`${url}/list`, {
        schema: {
            description: 'Lists Notes',
            tags: ["Characters", "Notes"],
            body: T.object({
                campaign_id: T.string(),
                character_id: T.string(),
            }, { required: ['campaign_id', 'character_id'] }),
            headers: AuthenticationHeaders,
        }
    }, async (req: FastifyRequest<{ Body: CharacterInteraction}>, reply): Promise<CharacterNote<Campaign<CampaignType>>[]> => {
        const {body} = req;
        const {campaign, token: {user}} = await req.authenticate_verifyCampaign(body.campaign_id);
        if (campaign.type === CampaignType.SWADE) {
            const character = await prisma.sWADE_CharacterSheet.findFirst({
                where: {
                    id: body.character_id,
                }
            });

            if (!character)
                reply.error(400, "Character not found");

            const notes = await prisma.sWADE_CharacterSheet_Note.findMany({
                where: {
                    OR: [
                        {visible: true},
                        {creator_id: user.id}
                    ]
                }
            });

            return notes.map(swade_export_character_note);
        } else
            reply.error(400, "Invalid Campaign");
    });
}
