import type { users } from "../../generated/prisma/client.js";

export const sanitizeUser = (user: users) => {
  const { password, ...userWithoutPassword } = user;
  return userWithoutPassword;
};