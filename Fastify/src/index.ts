import { FastifyInstance } from "fastify";
import { Server, IncomingMessage, ServerResponse } from "http";
import build from "./app";

const env_to_logger = {
    development: {
        transport: {
            target: 'pino-pretty',
            options: {
                translateTime: 'HH:MM:ss Z',
                ignore: 'pid,hostname',
            },
        },
    },
    production: true,
    test: false,
}

export const app: FastifyInstance<Server, IncomingMessage, ServerResponse> = build({
    logger: env_to_logger['development'] ?? true,
});

app.listen(8000, (err, address) => {
    if (err) {
        console.error(err);
        process.exit(1);
    }
});
module.exports = app