import { add_skill_character, CampaignType, Character, SWADE_RequirementType, skill_character_pair } from '@ref/types';
import { prisma } from 'app/app';
import {FastifyInstance, FastifyRequest} from 'fastify';
import { prisma_export_character } from './SWADE_Utils';

export const skill_add = (fastify: FastifyInstance, baseUrl: string) => {
    fastify.post(`${baseUrl}/skill/add`, {
        schema: {
            description: 'Endpoint used to add a skill to a character',
            tags: ['Characters', 'Campaign', 'Skill'],
            body: {
                type: 'object',
                properties: {
                    character_id: {type: 'string'},
                    skill_id: {type: 'string'},
                    level: {type: 'number'}
                }
            }
        }
    }, async (req: FastifyRequest<{Body: add_skill_character}>, reply): Promise<Character> => {
        const {body} = req;
        const {campaign} = await req.authenticate_verifyCampaign(body.campaign_id);
        
        if (campaign.type === CampaignType.SWADE) {

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

            if (character.skills.some(skill => skill.skill_id === body.skill_id))
                reply.error(400, 'Character already has that skill');

            const skill = await prisma.sWADE_Skill.findUnique({
                where: {
                    id: body.skill_id
                },
                include: {
                    requirements: true
                }
            });
            
            if (!skill)
                reply.error(404, 'Skill not found');

            // Check if requirements asre met 
            
            const character_skills = character.skills.map(skill => ({[skill.skill_id]: skill.level})).reduce((a,b) => ({...a,...b}), {});
            const character_edges = character.edges.map(skill => skill.edge_id);
            
            // TODO check ranks
            
            const required_skills = skill.requirements
                .filter(requirement => requirement.type === SWADE_RequirementType.skill)
                .every(requirement => (
                    character_skills[requirement.skill_id] !== undefined && 
                    (!requirement.level || requirement.level <= character_skills[requirement.skill_id])
                ));

            const required_edges = skill.requirements
                .filter(requirement => requirement.type === SWADE_RequirementType.edge)
                .every(requirement => character_edges.includes(requirement.edge_id));

            if (!required_skills)
                reply.error(400, 'User does not have required skills')

            if (!required_edges)
                reply.error(400, 'User does not have required edges')

            // TODO point calculations
            
            await prisma.sWADE_CharacterSheet_Skill.create({
                data: {
                    level: body.level,
                    skill_id: body.skill_id,
                    character_id: body.character_id
                }
            });

            return prisma_export_character(body.character_id);
        } else
            throw new Error('Unreachable');
    })
}


export const skill_remove = (fastify: FastifyInstance, baseUrl: string) => {
    fastify.post(`${baseUrl}/skill/remove`, {
        schema: {
            description: 'Endpoint used to add a skill to a character',
            tags: ['Characters', 'Campaign', 'Skill'],
            body: {
                type: 'object',
                properties: {
                    character_id: {type: 'string'},
                    skill_id: {type: 'string'},
                }
            }
        }
    }, async (req: FastifyRequest<{Body: skill_character_pair}>, reply): Promise<Character> => {
        const {body} = req;
        const {campaign} = await req.authenticate_verifyCampaign(body.campaign_id);

        if (campaign.type === CampaignType.SWADE) {

            const character = await prisma.sWADE_CharacterSheet.findUnique({
                where: {
                    id: body.character_id
                },
                include: {
                    skills: true,
                }
            }); 

            if (!character)
                reply.error(404, 'Character not found')

            const skill_pair = character.skills.filter(skill => skill.skill_id === body.skill_id);

            if (skill_pair.length === 0)
                reply.error(400, 'Character does not have skill');

            const skill_pair_id = skill_pair[0].id;

            await prisma.sWADE_CharacterSheet_Skill.delete({
                where: {
                    id: skill_pair_id
                }
            });

            return prisma_export_character(body.character_id);
        } else
            throw new Error('Unreachable');
    })
}
