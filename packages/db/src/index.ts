import { connect } from "@planetscale/database";
import { drizzle } from "drizzle-orm/planetscale-serverless";

import * as auth from "./schema/auth";
import * as cart from "./schema/cart";
import * as contact from "./schema/contact";
import * as course from "./schema/course";
import * as library from "./schema/library";
import * as media from "./schema/media";
import * as order from "./schema/order";
import * as page from "./schema/page";
import * as product from "./schema/product";
import * as role from "./schema/role";
import * as seo from "./schema/seo";
import * as settings from "./schema/settings";
import * as teacher from "./schema/teacher";

export * from "drizzle-orm";
export * from "./types";

export const schema = {
  ...auth,
  ...role,
  ...cart,
  ...contact,
  ...media,
  ...order,
  ...product,
  ...settings,
  ...course,
  ...library,
  ...page,
  ...seo,
  ...teacher,
};

export { mySqlTable as tableCreator } from "./schema/_table";

const connection = connect({
  host: process.env.DATABASE_HOST,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
});

export const db = drizzle(connection, { schema });
