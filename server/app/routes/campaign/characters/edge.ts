import { CampaignType, Character, SWADE_RequirementType, EdgeCharacterPair, AddEdgeCharacter, UserType } from '@ref/types';
import { prisma } from 'app/app';
import { FastifyRequest } from 'fastify';
import { prisma_export_character } from 'app/utils/SWADE_Utils';
import { T, Requests } from 'app/utils';

export const put = new Requests()
.authHeaders()
.description('Endpoint used to add a edge to a character')
.tags('Characters', 'Campaign', 'Edge')
.body(T.object({
    character_id: T.string(),
    edge_id: T.string(),
}))
.handle(async (req: FastifyRequest<{Body: AddEdgeCharacter}>, reply): Promise<Character> => {
    const {body} = req;
    const {campaign, token: {user}} = await req.authenticate_verifyCampaign(body.campaign_id, true);

    if (campaign.type !== CampaignType.SWADE) 
        reply.error(400, 'Edges only avaliable on SWADE');

    const character = await prisma.sWADE_CharacterSheet.findUnique({
        where: {
            id: body.character_id
        },
        include: {
            skills: true,
            edges: true
        }
    }); 

    if (!character)
        reply.error(404, 'Character not found')

    if (user.userType !== UserType.DM && character.creator_id !== user.id)
        reply.error(400, 'You can not change this character');

    if (character.edges.some(edge => edge.edge_id === body.edge_id))
        reply.error(400, 'Character already has that edge');

    const edge = await prisma.sWADE_Edge.findUnique({
        where: {
            id: body.edge_id
        },
        include: {
            requirements: true
        }
    });

    if (!edge)
        reply.error(404, 'Edge not found');

    // Check if requirements asre met 

    const character_skills = character.skills.map(skill => ({[skill.skill_id]: skill.level})).reduce((a,b) => ({...a,...b}), {});
    const character_edges = character.edges.map(edge => edge.edge_id);

    // TODO check ranks

    const required_skills = edge.requirements
    .filter(requirement => requirement.type === SWADE_RequirementType.skill)
    .every(requirement => (
        character_skills[requirement.skill_id] !== undefined && 
            (!requirement.level || requirement.level <= character_skills[requirement.skill_id])
    ));

    const required_edges = edge.requirements
    .filter(requirement => requirement.type === SWADE_RequirementType.edge)
    .every(requirement => character_edges.includes(requirement.edge_id));

    const required_attributes = edge.requirements
    .filter(requirement => requirement.type === SWADE_RequirementType.attribute)
    .every(requirement => character[requirement.attribute] >= requirement.level);

    if (!required_skills)
        reply.error(400, 'User does not have required skills')

    if (!required_edges)
        reply.error(400, 'User does not have required edges')

    if (!required_attributes)
        reply.error(400, 'User does not have required attributes')

    // TODO point calculations

    await prisma.sWADE_CharacterSheet_edge.create({
        data: {
            character_id: body.character_id,
            edge_id: body.edge_id,
        }
    });

    return prisma_export_character(body.character_id, user);
});

export const del = new Requests()
.authHeaders()
.description('Endpoint used to add a edge to a character')
.tags('Characters', 'Campaign', 'Edge')
.body(T.object({
    character_id: T.string(),
    edge_id: T.string(),
}))
.handle(async (req: FastifyRequest<{Body: EdgeCharacterPair}>, reply): Promise<Character> => {
    const {body} = req;
    const {campaign, token: {user}} = await req.authenticate_verifyCampaign(body.campaign_id, true);

    if (campaign.type !== CampaignType.SWADE) 
        reply.error(400, 'Invalid campaign type')

    const character = await prisma.sWADE_CharacterSheet.findUnique({
        where: {
            id: body.character_id
        },
        include: {
            edges: true,
        }
    }); 

    if (!character)
        reply.error(404, 'Character not found')

    if (character.creator_id !== user.id && user.userType !== UserType.DM)
        reply.error(400, "You can not change this character");

    const edge_pair = character.edges.filter(edge => edge.edge_id === body.edge_id);

    if (edge_pair.length === 0)
        reply.error(400, 'Character does not have edge');

    await prisma.sWADE_CharacterSheet_edge.delete({ where: { id: edge_pair[0].id } });

    // TODO check if any of the skills require this
    return prisma_export_character(body.character_id, user);
});
