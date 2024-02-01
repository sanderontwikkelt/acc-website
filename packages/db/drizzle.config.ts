import type { Config } from "drizzle-kit";
import * as dotenv from "dotenv";

dotenv.config({ path: "../../.env" });

const uri = [
  "mysql://",
  process.env.DATABASE_USERNAME,
  ":",
  process.env.DATABASE_PASSWORD,
  "@",
  process.env.DATABASE_HOST,
  ":3306/",
  process.env.DATABASE_NAME,
  '?ssl={"rejectUnauthorized":true}',
].join("");

export default {
  schema: "./src/schema",
  driver: "mysql2",
  dbCredentials: { uri },
  tablesFilter: ["physis_*"],
} satisfies Config;
