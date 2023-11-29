import { hash } from "bcryptjs";

export const createEncryptedPassword = async (password) => {
  return await hash(password, 12);
};
