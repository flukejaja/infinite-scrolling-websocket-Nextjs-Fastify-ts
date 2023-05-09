import fastify, { FastifyInstance, FastifyServerOptions, } from "fastify";
import path from 'path';
const autoload = require('@fastify/autoload')
import { errorSchema } from "./schemas/error";

interface buildOpts extends FastifyServerOptions {
  exposeDocs?: boolean;
}
const build = (opts: buildOpts = {}): FastifyInstance => {
  const app = fastify(opts);
  
  app.register(require("@fastify/cors"));
  app.get("/", async (_, res) => {
    res.send("Connected to flukejaja");
  });
  app.addSchema(errorSchema);

  app.register(autoload, {
    dir: path.join(__dirname, 'routes')
  })
  return app;
};

export default build;