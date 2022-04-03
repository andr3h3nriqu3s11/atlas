import Fastify from "fastify";

export const buildServer = (code: string) => {
  const fastify = Fastify();

  const baseUrl = "";

  fastify.register(import("fastify-cors"), { origin: "*" });

  fastify.get(`${baseUrl}/`, async () => {
    return {
      version: `0.0.1`,
      code,
    };
  });

  return fastify;
};
