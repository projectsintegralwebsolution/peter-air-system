import { jsonDb } from "./jsonStore";

export const prisma = jsonDb;
export type PrismaClient = typeof jsonDb;

export default prisma;
