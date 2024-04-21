import { FastifyInstance } from "fastify";
import { createRoleJsonSchema } from "./role.schemas";
import { createRoleHandler } from "./role.controllers";

export async function roleRoutes(app: FastifyInstance){
  app.post('/', { schema: createRoleJsonSchema}, createRoleHandler);
}