import { buildServer } from "./app";
const fastify = buildServer("test1");
fastify.listen(3001, "0.0.0.0", () => {
  console.log("Server running on 3001");
});
