import type { InferSelectModel } from "drizzle-orm";

import type * as schema from "./schema";

export type User = InferSelectModel<typeof schema.user>;
export type Role = InferSelectModel<typeof schema.role>;
export type Permission = InferSelectModel<typeof schema.permission>;
export type Media = InferSelectModel<typeof schema.media>;
export type Product = InferSelectModel<typeof schema.product>;
export type ProductCategory = InferSelectModel<typeof schema.productCategory>;
export type ProductVariant = InferSelectModel<typeof schema.productVariant>;
export type Library = InferSelectModel<typeof schema.library>;
export type LibraryCategory = InferSelectModel<typeof schema.libraryCategory>;
export type Header = InferSelectModel<typeof schema.header>;
export type Footer = InferSelectModel<typeof schema.footer>;
export type Page = InferSelectModel<typeof schema.page>;
export type PageBackup = InferSelectModel<typeof schema.block_backup>;
export type SEO = InferSelectModel<typeof schema.seo>;
export type Teacher = InferSelectModel<typeof schema.teacher>;
export type Specialist = InferSelectModel<typeof schema.specialist>;
export type Course = InferSelectModel<typeof schema.course>;
export type ProductPaymentPlan = InferSelectModel<
  typeof schema.productPaymentPlan
>;
