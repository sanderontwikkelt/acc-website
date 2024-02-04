import type { InferSelectModel } from "drizzle-orm";

import type * as schema from "./schema";

export type User = InferSelectModel<typeof schema.user>;
export type Role = InferSelectModel<typeof schema.role>;
export type Permission = InferSelectModel<typeof schema.permission>;
export type Media = InferSelectModel<typeof schema.media>;
export type Product = InferSelectModel<typeof schema.product>;
export type ProductCategory = InferSelectModel<typeof schema.productCategory>;
