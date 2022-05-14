import dotenv from "dotenv";

dotenv.config();

export const SECRET_ACCESS_TOKEN = process.env.SECRET_ACCESS_TOKEN as string;
export const SECRET_REFRESH_TOKEN = process.env.SECRET_REFRESH_TOKEN as string;
