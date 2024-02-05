import { z } from "zod";

import { notEmptyNumber, notEmptyString } from "./utils";

export const CreatePostSchema = z.object({
  title: z.string().min(1),
  content: z.string().min(1),
});

export const userFormSchema = z.object({
  name: notEmptyString,
  roleId: notEmptyNumber,
  email: z.string().email({ message: "Vul een geldig e-mail in." }),
});

export const teacherFormSchema = z.object({
  title: z.string().min(1),
  name: z.string().min(1),
  description: z.string().min(1),
  mediaId: z.number(),
});

export const CreateRoleSchema = z.object({
  name: z.string().min(2),
  description: z.string().min(2).nullable(),
  permissionIds: z.array(z.string()),
});

export const roleFormSchema = z.object({
  name: z.string().min(2),
  description: z.string().min(2).nullable(),
  permissionIds: z.array(z.number()),
});

export const productCategoryFormSchema = z.object({
  title: z.string().min(2),
});

export const productFormSchema = z.object({
  slug: z.string().min(1),
  description: z.string().min(1),
  title: z.string().min(1),
  seoDescription: z.string(),
  seoTitle: z.string(),
  price: z.string(),
  categoryId: z.number(),
  stock: z.number(),
  mediaIds: z.array(z.number()),
  variants: z.array(
    z.object({ title: z.string(), stock: z.number().optional() }),
  ),
  // relatedProductIds: z.array(z.number()),
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
