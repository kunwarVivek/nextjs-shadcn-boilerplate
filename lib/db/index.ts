import { drizzle } from "drizzle-orm/sqlite3";
import sqlite3 from "sqlite3";
import { open } from "sqlite";
import path from "path";
import fs from "fs";

// Ensure the database directory exists
const dbDir = path.resolve(process.cwd(), "lib/db");
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}

const dbPath = path.join(dbDir, "sqlite.db");

// Create a database connection
let db;

// This is a singleton pattern to ensure we only create one database connection
export async function getDbConnection() {
  if (!db) {
    // Create the SQLite database file if it doesn't exist
    if (!fs.existsSync(dbPath)) {
      fs.writeFileSync(dbPath, "");
    }

    // Open the database connection
    const sqlite = await open({
      filename: dbPath,
      driver: sqlite3.Database
    });

    db = drizzle(sqlite);
  }

  return db;
}

// For compatibility with existing code
export const db = {
  select: () => {
    console.warn("Using synchronous db access. Please use getDbConnection() instead.");
    return {
      from: () => ({
        where: () => [],
        limit: () => [],
        offset: () => [],
        leftJoin: () => ({
          where: () => []
        })
      })
    };
  },
  insert: () => ({
    values: async () => {
      console.warn("Using synchronous db access. Please use getDbConnection() instead.");
      return [];
    }
  }),
  update: () => ({
    set: () => ({
      where: async () => {
        console.warn("Using synchronous db access. Please use getDbConnection() instead.");
        return [];
      }
    })
  }),
  delete: () => ({
    where: async () => {
      console.warn("Using synchronous db access. Please use getDbConnection() instead.");
      return [];
    }
  }),
  transaction: async (fn) => {
    console.warn("Using synchronous db access. Please use getDbConnection() instead.");
    return await fn({});
  },
  fn: {
    count: () => 0
  }
};