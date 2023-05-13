import { CampaignType, Character, SWADE_RequirementType, add_edge_character, EdgeCharacterPair } from '@ref/types';
import { prisma } from 'app/app';
import {FastifyInstance, FastifyRequest} from 'fastify';
import { prisma_export_character } from './SWADE_Utils';

export const edge_add = (fastify: FastifyInstance, baseUrl: string) => {
    fastify.post(`${baseUrl}/edge/add`, {
        schema: {
            description: 'Endpoint used to add a edge to a character',
            tags: ['Characters', 'Campaign', 'Edge'],
            body: {
                type: 'object',
                properties: {
                    character_id: {type: 'string'},
                    edge_id: {type: 'string'},
                    level: {type: 'number'}
                }
            }
        }
    }, async (req: FastifyRequest<{Body: add_edge_character}>, reply): Promise<Character> => {
        const {body} = req;
        const {campaign} = await req.authenticate_verifyCampaign(body.campaign_id);
        
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

        return prisma_export_character(body.character_id);
    })
}


export const edge_remove = (fastify: FastifyInstance, baseUrl: string) => {
    fastify.post(`${baseUrl}/edge/remove`, {
        schema: {
            description: 'Endpoint used to add a edge to a character',
            tags: ['Characters', 'Campaign', 'Edge'],
            body: {
                type: 'object',
                properties: {
                    character_id: {type: 'string'},
                    edge_id: {type: 'string'},
                }
            }
        }
    }, async (req: FastifyRequest<{Body: EdgeCharacterPair}>, reply): Promise<Character> => {
        const {body} = req;
        const {campaign} = await req.authenticate_verifyCampaign(body.campaign_id);

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

        const edge_pair = character.edges.filter(edge => edge.edge_id === body.edge_id);

        if (edge_pair.length === 0)
            reply.error(400, 'Character does not have edge');

        await prisma.sWADE_CharacterSheet_edge.delete({
            where: {
                id: edge_pair[0].id
            }
        });

        return prisma_export_character(body.character_id);
    })
}
