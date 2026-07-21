import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";

dotenv.config();

let prisma;

export const getPrismaClient = () => {

  if (!prisma) {
    prisma = new PrismaClient();
  }

  return prisma;
};