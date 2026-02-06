import dotenv from 'dotenv';
dotenv.config();

const requiredEnv = ["JWT_SECRET"];

requiredEnv.forEach((key) => {
  if (!process.env[key]) {
    throw new Error(`Environment variable ${key} is missing`);
  }
});

export const JWT_SECRET = process.env.JWT_SECRET as string;

