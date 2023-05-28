import { SWADE_Hindrances } from '@prisma/client';
import { Hindrance, HindranceType } from '@ref/types/swade/hindrance';
import { FastifyInstance } from 'fastify';
import { list } from './list';
import { create, update } from './mutation';

export const set_campaing_swade_hindrances = (fastify: FastifyInstance, baseUrl: string) => {
    const url = `${baseUrl}/hindrances`;
    create(fastify, url);
    update(fastify, url);
    list(fastify, url);
}

export const export_hindrance = (hindrance: SWADE_Hindrances): Hindrance => ({
    id: hindrance.id,
    title: hindrance.title,
    description: hindrance.description,
    type: hindrance.type as HindranceType,
});
