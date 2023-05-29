import { CampaignType, ImportCampaign, Campaign, UserType, CreateEdge, CreateEdgeImportRequirement, SWADE_RequirementType, ImportSkill, CreateSkillImportRequirement } from "@ref/types";
import { prisma } from "app/app";
import { AuthenticationHeaders, Requests, T } from "app/utils";
import { FastifyInstance, FastifyRequest } from "fastify";
import { defaultSWADE } from "./DefaultSwade";

// Time for some graphs
type GraphNode = {
    title: string,
    id: string | null,
    mapped: boolean,
    requiredments: {node: GraphNode, level?: number}[],
} & (
    {
        type: "edge",
        obj: CreateEdge & {
            requirements: CreateEdgeImportRequirement[],
        }

    } | {
        type: "skill",
        obj: ImportSkill & {
            requirements: CreateSkillImportRequirement[],
        },
    }
);

async function mapNode(node: GraphNode, otherNodes: GraphNode[], mapedNodes: GraphNode[], travessed: string[] = new Array<string>()): Promise<GraphNode[]> {
    if (travessed.includes(node.title))
        throw new Error("Cycle detected you have a skill or edge that depends on a skill or edge that depends on the original skill or edge");

    if (node.mapped)
        return otherNodes;

    const mappedRequirements: {node: GraphNode, level: number}[] = [];
    const requirements: {node: GraphNode, level: number}[] = [];
    
    outer:
    for (const requirement of node.obj.requirements) {
        if (requirement.type === SWADE_RequirementType.attribute)
            continue outer;

        for (const mapedNode of mapedNodes) {
            if (requirement.type == mapedNode.type && requirement.title == mapedNode.title) {
                mappedRequirements.push({node: mapedNode, level: requirement.level});
                continue outer;
            }
        }

        for (const otherNode of otherNodes) {
            if (requirement.type == otherNode.type && requirement.title == otherNode.title) {
                requirements.push({ node: otherNode, level: requirement.level});
                continue outer;
            }
        }

        if (requirement.type === SWADE_RequirementType.skill) {
            const skill = await prisma.sWADE_Skill.findFirst({
                where: {
                    title: requirement.title,
                },
            });

            if (skill) continue outer;
        } else {
            const edge = await prisma.sWADE_Skill.findFirst({
                where: {
                    title: requirement.title,
                },
            });

            if (edge) continue outer;
        }

        throw new Error(`${node.type}: ${node.title}; ${requirement.title} does not exist`);
    }

    for (const nonMaped of requirements) {
        otherNodes = await mapNode(nonMaped.node, otherNodes, mapedNodes, [...travessed, node.title]);
        mappedRequirements.push(nonMaped);
    }

    node.requiredments = mappedRequirements;
    node.mapped = true;
    mapedNodes.push(node);

    return otherNodes.filter(other => other.type !== node.type || other.title !== node.title);
}

async function createNode(node: GraphNode, mapedNodes: GraphNode[]): Promise<GraphNode[]> {
    // Already created
    if (node.id !== null)
        return mapedNodes.filter(other => other.id !== node.id || other.type !== node.type);

    for (const otherNode of node.requiredments) {
        mapedNodes = await createNode(otherNode.node, mapedNodes);
    }

    if (node.type === "skill") {
        const prisma_skill = await prisma.sWADE_Skill.create({
            data: {
                title: node.title,
                base: node.obj.title,
                rank: node.obj.rank,
                description: node.obj.description,
            },
        });

        node.id = prisma_skill.id;

        for (const otherNode of node.requiredments) {
            if (otherNode.node.type === 'skill') {
                await prisma.sWADE_Skills_Requirement.create({
                    data: {
                        type: 'skill',
                        target_id: node.id,
                        skill_id: otherNode.node.id,
                        level: otherNode.level,
                    }
                });
            } else {
                await prisma.sWADE_Skills_Requirement.create({
                    data: {
                        type: 'edge',
                        target_id: node.id,
                        edge_id: otherNode.node.id,
                        level: otherNode.level,
                    }
                });
            }
        }
    } else {
        const prisma_edge = await prisma.sWADE_Edge.create({
            data: {
                title: node.title,
                description: node.obj.description,
                rank: node.obj.rank,
            },
        });

        node.id = prisma_edge.id;

        for (const otherNode of node.requiredments) {
            if (otherNode.node.type === 'skill') {
                await prisma.sWADE_Edge_requirements.create({
                    data: {
                        type: 'skill',
                        target_id: node.id,
                        skill_id: otherNode.node.id,
                        level: otherNode.level,
                    }
                });
            } else {
                await prisma.sWADE_Edge_requirements.create({
                    data: {
                        type: 'edge',
                        target_id: node.id,
                        edge_id: otherNode.node.id,
                        level: otherNode.level,
                    }
                });
            }
        }

        for (const otherReq of node.obj.requirements) {
            if (otherReq.type !== SWADE_RequirementType.attribute) 
                continue;

            await prisma.sWADE_Edge_requirements.create({
                data: {
                    type: 'attribute',
                    target_id: node.id,
                    level: otherReq.level,
                    attribute: otherReq.attribute
                }
            });

        }
    }

    return mapedNodes.filter(other => other.id !== node.id || other.type !== node.type);
}

export const post = new Requests()
.authHeaders()
.description('Imports edges, hindrances, skills, into a campaign')
.tags('Campaign')
.body(T.object({
    campaign_type: T.enum(["SWADE"]),
    default: T.boolean(false)
}, {required: ["campaign_type"], extra: true}))
.handle(async (
    req: FastifyRequest<{ Body: ImportCampaign<Campaign<CampaignType>>, }>, 
    reply
): Promise<Record<string, string>> => {
    const {user} = await req.authenticate_dm();
    const {body: bodyInit} = req;

    if (user.userType !== UserType.DM)
        reply.error(400, "You need to be a dm to use this");

    if (bodyInit.campaign_type === CampaignType.SWADE) {
        let otherNodes: GraphNode[] = [];
        let mapedNodes: GraphNode[] = [];

        const body = bodyInit.default ? defaultSWADE : bodyInit;

        // Deal with loading edges
        for (const edge of body.edges) {
            const prisma_edge = await prisma.sWADE_Edge.findFirst({
                where: {
                    title: edge.title,
                }
            });

            if (edge.requirements.length === 0 || prisma_edge !== null) {
                mapedNodes.push({
                    type: 'edge',
                    title: edge.title,
                    id: prisma_edge?.id ?? null,
                    obj: edge,
                    mapped: true,
                    requiredments: [],
                });
            } else {
                const node: GraphNode = {
                    type: 'edge',
                    title: edge.title,
                    id: null,
                    mapped: false,
                    obj: edge,
                    requiredments: [],
                };

                const requirements = [...edge.requirements.filter(req => req.type !== SWADE_RequirementType.attribute)];

                const nodeRequirements: {node: GraphNode, level?: number}[] = [];

                for (const requirement of requirements) {
                    for (const mapedNode of mapedNodes) {
                        if (requirement.type === mapedNode.type && requirement.title === mapedNode.title) {
                            nodeRequirements.push({node: mapedNode, level: requirement.level});
                        }
                    }
                }

                if (nodeRequirements.length === requirements.length) {
                    node.requiredments = nodeRequirements;
                    node.mapped = true;
                    mapedNodes.push(node);
                    continue;
                }

                otherNodes.push(node);
            }
        }

        for (const skill of body.skills) {
            const prisma_skill = await prisma.sWADE_Skill.findFirst({
                where: {
                    title: skill.title,
                }
            });

            if (skill.requirements.length === 0 || prisma_skill !== null) {
                mapedNodes.push({
                    type: 'skill',
                    title: skill.title,
                    id: prisma_skill?.id ?? null,
                    obj: skill,
                    mapped: true,
                    requiredments: [],
                });
            } else {

                const node: GraphNode = {
                    type: 'skill',
                    title: skill.title,
                    id: null,
                    obj: skill,
                    mapped: false,
                    requiredments: [],
                };

                const nodeRequirements: {node: GraphNode, level?: number}[] = [];

                for (const requirement of skill.requirements) {
                    for (const mapedNode of mapedNodes) {
                        if (requirement.type === mapedNode.type && requirement.title === mapedNode.title) {
                            nodeRequirements.push({node: mapedNode, level: requirement.level});
                        }
                    }
                }

                if (nodeRequirements.length === skill.requirements.length) {
                    node.requiredments = nodeRequirements;
                    node.mapped = true;
                    mapedNodes.push(node);
                    continue;
                }

                otherNodes.push(node);
            }
        }

        // Both skills and edges are mapped now we can check the graph to see if anything else needs mapping
        // So now we can map all the nodes
        while (otherNodes.length > 0) {
            // Note: will throw an error if something goes wrong;
            otherNodes = await mapNode(otherNodes[0], otherNodes, mapedNodes, []);
        }

        // Everthing will be maped and inside mapedNodes;
        while (mapedNodes.length > 0) {
            mapedNodes = await createNode(mapedNodes[0], mapedNodes);
        }

        for (const hindrance of body.hindrances) {
            const prisma_hindrance = await prisma.sWADE_Hindrances.findFirst({
                where: {
                    title: hindrance.title,
                }
            });

            if (prisma_hindrance) continue;

            await prisma.sWADE_Hindrances.create({
                data: {
                    title: hindrance.title,
                    description: hindrance.description,
                    type: hindrance.type,
                }
            });
        }
        return {};
    } else 
        reply.error(400, 'Invalid Campaign');
});
