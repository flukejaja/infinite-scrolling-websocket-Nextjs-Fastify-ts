import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { SocketStream } from "@fastify/websocket";
const path = require('path');

interface query_username {
    username: string;
}

const websocket_routes = async (fastify: FastifyInstance) => {
    fastify.register(require('@fastify/websocket'))
    fastify.register(async function (fastify) {
        fastify.get('/chat', { websocket: true }, (connection: SocketStream, req: FastifyRequest<{ Querystring: query_username }>) => {
            broadcast({
                sender: '__server',
                message: `${req.query.username} joined`
            });
            connection.socket.on('close', () => {
                broadcast({
                    sender: '__server',
                    message: `${req.query.username} left`
                });
            });
            connection.socket.on('message', (message: string) => {
                const messageString = Buffer.from(message).toString('utf8');
                broadcast({
                    sender: req.query.username,
                    message: messageString
                });
            });
        })
        
    })
    function broadcast(message: { sender: string, message: string }) {
        for (let client of fastify.websocketServer.clients) {
            client.send(JSON.stringify(message));
        }
    }
};


export default websocket_routes;