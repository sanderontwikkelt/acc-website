import type { InferSelectModel } from "drizzle-orm";

import type * as schema from "./schema";

export type User = InferSelectModel<typeof schema.user>;
export type Role = InferSelectModel<typeof schema.role>;
