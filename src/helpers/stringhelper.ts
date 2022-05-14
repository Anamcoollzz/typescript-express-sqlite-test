import bcrypt from "bcrypt";

export const hashPassword = async (plainText: string): Promise<string> => {
  const hashed: string = await bcrypt.hash(plainText, 10);
  return hashed;
};

export const compareHash = async (
  plainText: string,
  hashText: string
): Promise<boolean> => {
  return bcrypt.compare(plainText, hashText);
};
