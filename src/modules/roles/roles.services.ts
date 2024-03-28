import { InferInsertModel } from "drizzle-orm";
import { db } from "../../db";
import { roles } from "../../db/schema";

export async function createRole(data: InferInsertModel<typeof roles>){
  const result = await db.insert(roles).values(data).returning();

  return result[0];
}