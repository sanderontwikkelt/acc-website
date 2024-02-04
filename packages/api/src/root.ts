import { authRouter } from "./router/auth";
import { shoppingCartRouter } from "./router/cart";
import { mediaRouter } from "./router/media";
import { orderRouter } from "./router/order";
import { permissionRouter } from "./router/permission";
import { productRouter } from "./router/product";
import { roleRouter } from "./router/role";
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
  stripe: stripeRouter,
  cart: shoppingCartRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
