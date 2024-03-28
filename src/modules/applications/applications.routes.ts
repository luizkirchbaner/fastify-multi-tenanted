import { FastifyInstance } from "fastify";
import { createApplicationHandler, getApplicationsHandler } from "./applications.controller";
import { createApplicationJsonSchema } from "./applications.schemas";

export async function applicationRoutes(app: FastifyInstance){
  app.post('/', {
    schema: createApplicationJsonSchema
  }, createApplicationHandler);
  app.get('/', getApplicationsHandler);
}