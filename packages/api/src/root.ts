import { authRouter } from "./router/auth";
import { shoppingCartRouter } from "./router/cart";
import { mediaRouter } from "./router/media";
import { orderRouter } from "./router/order";
import { productRouter } from "./router/product";
import { roleRouter } from "./router/role";
import { stripeRouter } from "./router/stripe";
import { userRouter } from "./router/user";
import { createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
  auth: authRouter,
  user: userRouter,
  role: roleRouter,
  media: mediaRouter,
  order: orderRouter,
  product: productRouter,
  stripe: stripeRouter,
  cart: shoppingCartRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
