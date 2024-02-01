import { z } from "zod";

export const CreatePostSchema = z.object({
  title: z.string().min(1),
  content: z.string().min(1),
});

export const userFormSchema = z.object({
  name: z.string().min(1),
  roleId: z.number(),
  email: z.string().min(1).email(),
});

export const CreateRoleSchema = z.object({
  name: z.string().min(2),
  description: z.string().min(2).nullable(),
  permissionIds: z.array(z.string()),
});

export const roleFormSchema = z.object({
  name: z.string().min(2),
  description: z.string().min(2).nullable(),
  permissionIds: z.array(z.string()),
});

export const productFormSchema = z.object({
  slug: z.string().min(1),
  title: z.string().min(1),
  price: z.string(),
  stock: z.number(),
});

export const orderFormSchema = z.object({
  userId: z.number(),
  status: z.enum([
    "new",
    "paid",
    "cancelled",
    "progress",
    "production",
    "sending",
    "sent",
    "completed",
  ]),
});

export const mediaFormSchema = z.object({
  filename: z.string().min(1),
  size: z.number(),
  mimetype: z.string().min(1),
  width: z.number(),
  height: z.number(),
  url: z.string().min(1),
  filepath: z.string().min(1),
});

export const cartFormSchema = z.object({
  userId: z.string(),
});

export const lineItem = z.object({
  price: z.string(),
  quantity: z.number(),
});

export const checkoutSessionFormSchema = z.array(lineItem);
