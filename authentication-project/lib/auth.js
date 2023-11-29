import { compare, hash } from "bcryptjs";

export const createEncryptedPassword = async (password) => {
  return await hash(password, 12);
};

export const verifyPassword = async (password, encryptedPassword) => {
  return await compare(password, encryptedPassword);
};
