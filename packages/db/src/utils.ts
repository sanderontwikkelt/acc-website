import {
  decimal,
  int,
  serial,
  timestamp,
  varchar,
} from "drizzle-orm/mysql-core";

export const id = serial("id").primaryKey().autoincrement();

export const nnTSDate = (col: string) =>
  timestamp(col, { mode: "date" }).notNull();

export const nnVarChar = (col: string) =>
  varchar(col, { length: 256 }).notNull();

export const varChar = (col: string) => varchar(col, { length: 256 });

export const nnInt = (col: string) => int(col).notNull();

export const nnDec = (col: string) => decimal(col).notNull();

export const createdAt = timestamp("created_at").defaultNow().notNull();

export const updatedAt = timestamp("updated_at")
  .defaultNow()
  .onUpdateNow()
  .notNull();
