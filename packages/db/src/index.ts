import { connect } from "@planetscale/database";
import { drizzle } from "drizzle-orm/planetscale-serverless";

import * as auth from "./schema/auth";
import * as cart from "./schema/cart";
import * as contact from "./schema/contact";
import * as media from "./schema/media";
import * as order from "./schema/order";
import * as product from "./schema/product";
import * as role from "./schema/role";
import * as settings from "./schema/settings";

export const schema = {
  ...auth,
  ...role,
  ...cart,
  ...contact,
  ...media,
  ...order,
  ...product,
  ...settings,
};

export { mySqlTable as tableCreator } from "./schema/_table";

export * from "drizzle-orm";

const connection = connect({
  host: process.env.DB_HOST!,
  username: process.env.DB_USERNAME!,
  password: process.env.DB_PASSWORD!,
});

export const db = drizzle(connection, { schema });
