import { FastifyReply, FastifyRequest } from "fastify";
import { CreateUserBody, LoginBody } from "./users.schemas";
import { SYSTEM_ROLES } from "../../config/permissions";
import { getRoleByName } from "../roles/roles.services";
import { assignRoleToUser, createUser, getUserByEmail, getUsersByApplication } from "./users.services";
import jwt from "jsonwebtoken";

export async function createUserHandler(
  request: FastifyRequest<{Body: CreateUserBody}>,
  reply: FastifyReply
) {
  const {initialUser, ...data} = request.body;

  const roleName = initialUser
    ? SYSTEM_ROLES.SUPER_ADMIN
    : SYSTEM_ROLES.APPLICATION_USER;

  if (roleName === SYSTEM_ROLES.SUPER_ADMIN) {
    const appUsers = await getUsersByApplication(data.applicationId);

    if (appUsers.length > 0) {
      return reply.code(400).send({
        message: "Application already has super admin user",
        extensions: {
          code: "APPLICATION_ALREADY_SUPER_USER",
          applicationId: data.applicationId,
        }
      })
    }
  }

  const role = await getRoleByName({
    name: roleName,
    applicationId: data.applicationId
  });

  if (!role) {
    return reply.code(404).send({
      message: "Role not found"
    })
  }

  try {
    const user = await createUser(data);

    await assignRoleToUser({
      userId: user.id,
      roleId: role.id,
      applicationId: data.applicationId
    })

    return user
  } catch (e) {

  }
}

export async function loginHandler(request: FastifyRequest<{Body: LoginBody}>, reply: FastifyReply) {
  const { applicationId, email, password } = request.body;

  const user = await getUserByEmail({
    applicationId,
    email
  });

  if (!user) {
    return reply.code(400).send({
      message: "Invalid email or password."
    })
  }

  const token = jwt.sign({
    applicationId,
    email,
    scopes: user.permissions,
    id: user.id
  }, "secret");

  return { token };
}