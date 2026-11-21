/**
 * Pure JSON Database Client (Drop-in replacement for Prisma & SQLite)
 * 
 * Provides 100% compatible storage, retrieval, update, and deletion
 * operations backed completely by persistent JSON files in data/json-db/.
 * Removes all dependency on native SQLite binaries and Prisma engines.
 */
import { jsonDb } from "./jsonStore";

export const prisma = jsonDb as any;

export default prisma;
