import { CampaignType, CharacterNote, Campaign, CharacterInteraction, CreateCharacterNote, Character, ChangeCharacterNote, UserType, DeleteCharacterNote } from "@ref/types";
import { prisma } from "app/app";
import { Requests, T } from "app/utils";
import { FastifyRequest } from "fastify";
import { prisma_export_character, swade_export_character_note } from "app/utils/SWADE_Utils";

export const post = new Requests()
.authHeaders()
.description('Lists Notes')
.tags("Characters", "Notes")
.body(T.object({
    campaign_id: T.string(),
    character_id: T.string(),
}))
.handle(async (req: FastifyRequest<{ Body: CharacterInteraction}>, reply): Promise<CharacterNote<Campaign<CampaignType>>[]> => {
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

export const put = new Requests()
.authHeaders()
.description( 'Endpoint used to add a note to a character')
.tags("Characters", 'Notes')
.body(T.object({
    campaign_id: T.string(),
    character_id: T.string(),
    note: T.string(),
    visible: T.boolean(),
}, { required: ['campaign_id', 'note', 'character_id']}))
.handle(async (req: FastifyRequest<{Body: CreateCharacterNote }>, reply): Promise<Character> => {
    const {body} = req;
    const {campaign, token} = await req.authenticate_verifyCampaign(body.campaign_id);

    if (campaign.type === CampaignType.SWADE) {

        const swade_campaign = await prisma.sWADE_Campaign.findFirst({
            where: {
                campaign_id: campaign.id
            },
        });

        const check_character = await prisma.sWADE_CharacterSheet.findFirst({
            where: {
                campaign_id: swade_campaign.id,
                id: body.character_id,
            }
        }); 

        if (!check_character)
            reply.error(400, 'Character does not exists');

        await prisma.sWADE_CharacterSheet_Note.create({
            data: {
                creator_id: token.user.id,
                character_id: check_character.id,
                note: body.note,
                visible: body.visible,
            }
        });

        return prisma_export_character(check_character.id, token.user);
    } else
        reply.error(400, 'Invalid Campaign');
});

export const patch = new Requests()
.authHeaders()
.description('Endpoint used to add a note to a character')
.tags("Characters", "Notes")
.body(T.object({
    campaign_id: T.string(),
    id: T.string(),
    visible: T.boolean(),
    note: T.string(),
}, { required: ['campaign_id', 'id'] }))
.handle(async (req: FastifyRequest<{Body: ChangeCharacterNote }>, reply): Promise<Character> => {
    const {body} = req;
    const {campaign, token} = await req.authenticate_verifyCampaign(body.campaign_id);

    if (campaign.type === CampaignType.SWADE) {

        const note = await prisma.sWADE_CharacterSheet_Note.findFirst({
            where: {
                id: body.id,
            }
        });

        if (!note)
            reply.error(400, 'Note does not exists');

        if (note.creator_id !== token.userId && !(token.user.userType === UserType.DM && !body.note))
            reply.error(400, 'Only people who created the note can edit it');

        await prisma.sWADE_CharacterSheet_Note.update({
            data: {
                visible: body.visible,
                note: body.note,
            },
            where: {
                id: body.id
            }
        });

        return prisma_export_character(note.character_id, token.user);
    } else
        reply.error(400, 'Invalid Campaign');
});

export const del = new Requests()
.authHeaders()
.description("Remove note from character")
.tags("Characters", 'Notes')
.body(T.object({
    campaign_id: T.string(),
    id: T.string(),
}))
.handle(async (req: FastifyRequest<{Body: DeleteCharacterNote}>, reply): Promise<Character> => {
    const {body} = req;
    const {campaign, token} = await req.authenticate_verifyCampaign(body.campaign_id);

    if (campaign.type === CampaignType.SWADE) {

        const note = await prisma.sWADE_CharacterSheet_Note.findUnique({ where: { id: body.id } });

        if (!note)
            reply.error(404, 'Character Note does not exist');

        await prisma.sWADE_CharacterSheet_Note.delete({
            where: {
                id: note.id,
            }
        })

        return prisma_export_character(note.character_id, token.user);
    } else
        reply.error(400, 'Invalid Campaign');
});
