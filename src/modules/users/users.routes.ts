import { FastifyInstance } from "fastify";
import { assignRoleToUserJsonSchema, createUserJsonSchema, loginJsonSchema } from "./users.schemas";
import { assignRoleToUserHandler, createUserHandler, loginHandler } from "./users.controllers";

export async function usersRoutes(app: FastifyInstance){
  app.post('/', { schema: createUserJsonSchema }, createUserHandler);
  app.post('/login', { schema: loginJsonSchema }, loginHandler);
  app.post('/roles', { schema: assignRoleToUserJsonSchema }, assignRoleToUserHandler);
}