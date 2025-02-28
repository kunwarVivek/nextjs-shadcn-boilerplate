import type { Config } from "drizzle-kit";
import path from "path";

export default {
  schema: "./lib/db/schema.ts",
  out: "./lib/db/migrations",
  dialect: "sqlite",
  dbCredentials: {
    url: path.join(process.cwd(), "lib/db/sqlite.db"),
  },
} satisfies Config;