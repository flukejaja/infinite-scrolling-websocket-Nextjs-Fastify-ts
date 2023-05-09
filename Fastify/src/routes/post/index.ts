import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import data_json from './data.json';
const data = data_json.posts;
interface query_types {
    id: string,
}
const post_routes = async (fastify: FastifyInstance) => {
    fastify.get("/get", (request: FastifyRequest<{ Querystring: query_types }>, reply: FastifyReply) => {
        const { id } = request.query;
        const { start, end } = { start: Number(id), end: Number(id) + 10 }
        const sliceArr = data.slice(start, end)
        if (sliceArr.length === 0) return reply.status(404).send({ message: 'error', code: 404, data: sliceArr })
        setTimeout(() => reply.status(200).send({ message: 'ok', code: 200, data: sliceArr }), 1000)
    });
};
export default post_routes;