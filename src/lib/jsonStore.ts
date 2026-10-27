import fs from "fs";
import path from "path";

/**
 * Generates an alphanumeric unique ID (similar to CUID).
 */
export function generateJsonId(): string {
  return "cl" + Date.now().toString(36) + Math.random().toString(36).slice(2, 9);
}

const DB_DIR = path.join(process.cwd(), "data", "json-db");

/**
 * Ensures the JSON storage directory exists.
 */
function ensureDbDir() {
  if (!fs.existsSync(DB_DIR)) {
    fs.mkdirSync(DB_DIR, { recursive: true });
  }
}

/**
 * A lightweight, pure JSON-file-backed data collection that adheres to Prisma-like query semantics.
 */
export class JsonCollection<T extends Record<string, any>> {
  private filePath: string;
  private filename: string;
  private cache: T[] | null = null;

  constructor(filename: string) {
    this.filename = filename;
    this.filePath = path.join(DB_DIR, `${filename}.json`);
  }

  private readAll(): T[] {
    ensureDbDir();
    if (this.cache !== null) {
      return this.cache;
    }
    if (!fs.existsSync(this.filePath)) {
      this.cache = [];
      return this.cache;
    }
    try {
      const content = fs.readFileSync(this.filePath, "utf8");
      this.cache = JSON.parse(content || "[]");
    } catch (err) {
      console.warn(`[JsonDB] Error reading ${this.filename}.json, initializing empty:`, err);
      this.cache = [];
    }
    return this.cache || [];
  }

  private writeAll(items: T[]): void {
    ensureDbDir();
    this.cache = items;
    try {
      const tempPath = `${this.filePath}.tmp`;
      fs.writeFileSync(tempPath, JSON.stringify(items, null, 2), "utf8");
      fs.renameSync(tempPath, this.filePath);
    } catch (err) {
      // Fallback direct write
      fs.writeFileSync(this.filePath, JSON.stringify(items, null, 2), "utf8");
    }
  }

  /**
   * Evaluates if an item matches the Prisma 'where' condition.
   */
  private matchesWhere(item: any, where?: any): boolean {
    if (!where || Object.keys(where).length === 0) return true;

    for (const [key, condition] of Object.entries(where)) {
      if (key === "OR" && Array.isArray(condition)) {
        const matchesAny = condition.some((c) => this.matchesWhere(item, c));
        if (!matchesAny) return false;
        continue;
      }

      if (key === "AND" && Array.isArray(condition)) {
        const matchesAll = condition.every((c) => this.matchesWhere(item, c));
        if (!matchesAll) return false;
        continue;
      }

      if (key === "NOT") {
        if (Array.isArray(condition)) {
          const matchesAny = condition.some((c) => this.matchesWhere(item, c));
          if (matchesAny) return false;
        } else if (typeof condition === "object") {
          if (this.matchesWhere(item, condition)) return false;
        }
        continue;
      }

      const itemVal = item[key];

      if (condition === undefined) continue;

      if (condition === null) {
        if (itemVal !== null && itemVal !== undefined) return false;
        continue;
      }

      if (typeof condition === "object" && condition !== null && !(condition instanceof Date)) {
        const cond = condition as any;
        // contains
        if (cond.contains !== undefined) {
          const strItem = String(itemVal ?? "");
          const strSearch = String(cond.contains);
          if (cond.mode === "insensitive") {
            if (!strItem.toLowerCase().includes(strSearch.toLowerCase())) return false;
          } else {
            if (!strItem.includes(strSearch)) return false;
          }
          continue;
        }

        // in
        if (Array.isArray(cond.in)) {
          if (!cond.in.includes(itemVal)) return false;
          continue;
        }

        // notIn
        if (Array.isArray(cond.notIn)) {
          if (cond.notIn.includes(itemVal)) return false;
          continue;
        }

        // equals
        if (cond.equals !== undefined) {
          if (cond.mode === "insensitive" && typeof itemVal === "string") {
            if (itemVal.toLowerCase() !== String(cond.equals).toLowerCase()) return false;
          } else {
            if (itemVal !== cond.equals) return false;
          }
          continue;
        }

        // not
        if (cond.not !== undefined) {
          if (itemVal === cond.not) return false;
          continue;
        }

        // comparisons: gt, gte, lt, lte
        if (cond.gt !== undefined && !(itemVal > cond.gt)) return false;
        if (cond.gte !== undefined && !(itemVal >= cond.gte)) return false;
        if (cond.lt !== undefined && !(itemVal < cond.lt)) return false;
        if (cond.lte !== undefined && !(itemVal <= cond.lte)) return false;

        continue;
      }

      // Case insensitive check for strings if needed, or strict equal
      if (typeof condition === "string" && typeof itemVal === "string") {
        if (itemVal !== condition) return false;
      } else if (itemVal !== condition) {
        return false;
      }
    }

    return true;
  }

  /**
   * Sorts items according to Prisma orderBy.
   */
  private sortItems(items: T[], orderBy?: any): T[] {
    if (!orderBy) return items;

    const orders = Array.isArray(orderBy) ? orderBy : [orderBy];

    return [...items].sort((a: any, b: any) => {
      for (const order of orders) {
        for (const [key, direction] of Object.entries(order)) {
          const dir = String(direction).toLowerCase() === "desc" ? -1 : 1;
          const valA = a[key];
          const valB = b[key];

          if (valA === valB) continue;
          if (valA === undefined || valA === null) return 1 * dir;
          if (valB === undefined || valB === null) return -1 * dir;

          if (typeof valA === "number" && typeof valB === "number") {
            return (valA - valB) * dir;
          }

          if (valA instanceof Date && valB instanceof Date) {
            return (valA.getTime() - valB.getTime()) * dir;
          }

          const strA = String(valA);
          const strB = String(valB);
          return strA.localeCompare(strB) * dir;
        }
      }
      return 0;
    });
  }

  /**
   * Applies field selection if specified.
   */
  private applySelect(item: any, select?: Record<string, boolean>): any {
    if (!select || Object.keys(select).length === 0) return item;
    const selected: any = {};
    for (const [k, enabled] of Object.entries(select)) {
      if (enabled) selected[k] = item[k];
    }
    return selected;
  }

  // --------------------------------------------------------------------------
  // Public Query Methods
  // --------------------------------------------------------------------------

  async findMany(options?: {
    where?: any;
    orderBy?: any;
    take?: number;
    skip?: number;
    select?: any;
  }): Promise<any[]> {
    let items = this.readAll();

    if (options?.where) {
      items = items.filter((it) => this.matchesWhere(it, options.where));
    }

    if (options?.orderBy) {
      items = this.sortItems(items, options.orderBy);
    }

    if (options?.skip && options.skip > 0) {
      items = items.slice(options.skip);
    }

    if (options?.take && options.take > 0) {
      items = items.slice(0, options.take);
    }

    if (options?.select) {
      return items.map((it) => this.applySelect(it, options.select));
    }

    return items;
  }

  async findUnique(options: { where: any; select?: any }): Promise<any | null> {
    const items = this.readAll();
    const item = items.find((it) => this.matchesWhere(it, options.where)) || null;
    if (!item) return null;
    return options.select ? this.applySelect(item, options.select) : item;
  }

  async findFirst(options?: {
    where?: any;
    orderBy?: any;
    select?: any;
  }): Promise<any | null> {
    const results = await this.findMany({
      where: options?.where,
      orderBy: options?.orderBy,
      take: 1,
      select: options?.select,
    });
    return results[0] || null;
  }

  async create(options: { data: any }): Promise<any> {
    const items = this.readAll();
    const id = options.data.id || generateJsonId();
    const now = new Date().toISOString();

    const newItem = {
      ...options.data,
      id,
      createdAt: options.data.createdAt
        ? new Date(options.data.createdAt).toISOString()
        : now,
      updatedAt: options.data.updatedAt
        ? new Date(options.data.updatedAt).toISOString()
        : now,
    };

    items.push(newItem);
    this.writeAll(items);
    return newItem;
  }

  async update(options: { where: any; data: any }): Promise<any> {
    const items = this.readAll();
    const idx = items.findIndex((it) => this.matchesWhere(it, options.where));
    if (idx === -1) {
      throw new Error(`Record not found in ${this.filename} to update`);
    }

    const updated: any = { ...items[idx] };
    for (const [k, v] of Object.entries(options.data)) {
      if (v && typeof v === "object" && "increment" in (v as any)) {
        updated[k] = (Number(updated[k]) || 0) + (Number((v as any).increment) || 1);
      } else {
        updated[k] = v;
      }
    }
    updated.updatedAt = new Date().toISOString();
    items[idx] = updated as T;
    this.writeAll(items);
    return updated;
  }

  async upsert(options: { where: any; update: any; create: any }): Promise<any> {
    const existing = await this.findFirst({ where: options.where });
    if (existing) {
      return this.update({ where: { id: existing.id }, data: options.update });
    } else {
      return this.create({ data: { ...options.where, ...options.create } });
    }
  }

  async delete(options: { where: any }): Promise<any> {
    const items = this.readAll();
    const idx = items.findIndex((it) => this.matchesWhere(it, options.where));
    if (idx === -1) {
      throw new Error(`Record not found in ${this.filename} to delete`);
    }
    const [removed] = items.splice(idx, 1);
    this.writeAll(items);
    return removed;
  }

  async deleteMany(options?: { where?: any }): Promise<{ count: number }> {
    let items = this.readAll();
    const initialLen = items.length;
    if (!options?.where || Object.keys(options.where).length === 0) {
      this.writeAll([]);
      return { count: initialLen };
    }
    items = items.filter((it) => !this.matchesWhere(it, options.where));
    this.writeAll(items);
    return { count: initialLen - items.length };
  }

  async count(options?: { where?: any }): Promise<number> {
    const items = this.readAll();
    if (!options?.where || Object.keys(options.where).length === 0) {
      return items.length;
    }
    return items.filter((it) => this.matchesWhere(it, options.where)).length;
  }

  async aggregate(options?: {
    _sum?: Record<string, boolean>;
    _count?: boolean;
  }): Promise<any> {
    const items = this.readAll();
    const result: any = {};
    if (options?._sum) {
      result._sum = {};
      for (const key of Object.keys(options._sum)) {
        result._sum[key] = items.reduce(
          (acc: number, item: any) => acc + (Number(item[key]) || 0),
          0
        );
      }
    }
    if (options?._count) {
      result._count = items.length;
    }
    return result;
  }
}

/**
 * The unified JSON file client that provides drop-in replacement for Prisma.
 */
export const jsonDb = {
  user: new JsonCollection("users"),
  blog: new JsonCollection("blogs"),
  category: new JsonCollection("categories"),
  tag: new JsonCollection("tags"),
  redirect: new JsonCollection("redirects"),
  mediaAsset: new JsonCollection("media"),
  siteContent: new JsonCollection("site-content"),
  heroSlide: new JsonCollection("hero-slides"),
  product: new JsonCollection("products"),
  productCategory: new JsonCollection("product-categories"),
  industry: new JsonCollection("industries"),
  service: new JsonCollection("services"),
  enquiry: new JsonCollection("enquiries"),
  pageContent: new JsonCollection("page-content"),

  async $connect() {
    ensureDbDir();
    return Promise.resolve();
  },
  async $disconnect() {
    return Promise.resolve();
  },
};

export default jsonDb;
