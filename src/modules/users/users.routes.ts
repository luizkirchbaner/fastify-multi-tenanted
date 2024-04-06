import { FastifyInstance } from "fastify";
import { createUserJsonSchema } from "./users.schemas";
import { createUserHandler } from "./users.controllers";

export async function usersRoutes(app: FastifyInstance){
  app.post('/', { schema: createUserJsonSchema }, createUserHandler);
}