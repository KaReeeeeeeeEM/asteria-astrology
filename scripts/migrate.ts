import { config } from "dotenv";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { migrate } from "drizzle-orm/neon-http/migrator";
config({ path: ".env.local", quiet: true });
if (!process.env.DATABASE_URL) throw new Error("DATABASE_URL is required");
async function main() {
  await migrate(drizzle(neon(process.env.DATABASE_URL!)), {
    migrationsFolder: "./drizzle",
  });
  console.log("Database migrations applied.");
}
main().catch((e) => {
  console.error("Migration failed:", e.message);
  process.exit(1);
});
