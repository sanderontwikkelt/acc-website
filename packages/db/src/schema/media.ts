import { relations } from "drizzle-orm";

import { createdAt, id, nnInt, updatedAt, varChar } from "../utils";
import { mySqlTable } from "./_table";
import { contact_email } from "./contact";
import { product } from "./product";
import { settings } from "./settings";

export const media = mySqlTable("media", {
  id,
  filename: varChar("filename"),
  size: nnInt("size"),
  width: nnInt("width"),
  height: nnInt("height"),
  mimetype: varChar("mimetype"),
  filepath: varChar("filepath"),
  url: varChar("url"),
  createdAt,
  updatedAt,
});

export const mediaRelations = relations(media, ({ many }) => ({
  settings: many(settings),
  products: many(product),
}));

export const file = mySqlTable("file", {
  id,
  filename: varChar("filename"),
  size: nnInt("size"),
  height: nnInt("height"),
  width: nnInt("width"),
  mimetype: varChar("mimetype"),
  filepath: varChar("filepath"),
  url: varChar("url"),
  createdAt,
  updatedAt,
});

export const fileRelations = relations(file, ({ one }) => ({
  contactEmail: one(contact_email),
}));
