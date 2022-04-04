import Fastify from "fastify";
import path from "path";
import fastifyStatic from "fastify-static";
import { frontendPath } from "./constants";

export const buildServer = (code: string) => {
  const fastify = Fastify();

  const baseUrl = "";

  fastify.register(import("fastify-cors"), { origin: "*" });

  fastify.register(fastifyStatic, {
    root: path.join(__dirname, frontendPath),
    prefix: "/app/",
    index: ["index.html"],
  });

  fastify.get(`${baseUrl}/`, async () => {
    return {
      version: `0.0.1`,
      code,
    };
  });

  return fastify;
};
