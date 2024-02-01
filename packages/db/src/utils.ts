import { sql } from "drizzle-orm";
import { datetime, decimal, int, serial, timestamp, varchar } from "drizzle-orm/mysql-core";

export const id = serial("id").primaryKey()

export const nnTSDate = (col: string) => timestamp(col, { mode: "date" }).notNull()
export const nnVarChar = (col: string) => varchar(col, { length: 256 }).notNull()
export const varChar = (col: string) => varchar(col, { length: 256 })
export const nnInt = (col: string) => int(col).notNull()
export const nnDec = (col: string) => decimal(col).notNull()
export const createdAt = datetime("createdAt").notNull().default(sql`current_timestamp(3)`)
export const updatedAt = datetime("updatedAt").default(sql`current_timestamp(3) on update current_timestamp(3)`)