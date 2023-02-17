import { buildServer } from "./app";

async function run() {
    const fastify = await buildServer("test1");

    fastify.listen({
        port: 3001,
        host: "0.0.0.0"
    }, (err) => {

        if (err)
            return console.log(err)

        console.log("Server running on 3001");
    });
}

run();

