import { authRouter } from "./router/auth";
import { cartRouter } from "./router/cart";
import { footerRouter } from "./router/footer";
import { headerRouter } from "./router/header";
import { mediaRouter } from "./router/media";
import { orderRouter } from "./router/order";
import { pageRouter } from "./router/page";
import { permissionRouter } from "./router/permission";
import { productRouter } from "./router/product";
import { productCategoryRouter } from "./router/product-category";
import { libraryRouter } from "./router/library";
import { libraryCategoryRouter } from "./router/library-category";
import { roleRouter } from "./router/role";
import { seoRouter } from "./router/seo";
import { stripeRouter } from "./router/stripe";
import { teacherRouter } from "./router/teacher";
import { userRouter } from "./router/user";
import { createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
  auth: authRouter,
  user: userRouter,
  teacher: teacherRouter,
  role: roleRouter,
  permission: permissionRouter,
  media: mediaRouter,
  order: orderRouter,
  product: productRouter,
  productCategory: productCategoryRouter,
  library: libraryRouter,
  libraryCategory: libraryCategoryRouter,
  page: pageRouter,
  stripe: stripeRouter,
  cart: cartRouter,
  header: headerRouter,
  footer: footerRouter,
  seo: seoRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
