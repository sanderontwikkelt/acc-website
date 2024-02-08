import type { InferSelectModel } from "drizzle-orm";

import type * as schema from "./schema";

export type User = InferSelectModel<typeof schema.user>;
export type Role = InferSelectModel<typeof schema.role>;
export type Permission = InferSelectModel<typeof schema.permission>;
export type Media = InferSelectModel<typeof schema.media>;
export type Product = InferSelectModel<typeof schema.product>;
export type ProductCategory = InferSelectModel<typeof schema.productCategory>;
export type Header = InferSelectModel<typeof schema.header>;
export type Footer = InferSelectModel<typeof schema.footer>;
export type Page = InferSelectModel<typeof schema.page>;
export type PageBackup = InferSelectModel<typeof schema.block_backup>;
export type SEO = InferSelectModel<typeof schema.seo>;
