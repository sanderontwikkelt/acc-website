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

export const seoFormSchema = z.object({
  pageId: z.number(),
  title: z.string().nullable(),
  description: z.string().nullable(),
  ogTitle: z.string().nullable(),
  ogDescription: z.string().nullable(),
  mediaId: z.string().nullable(),
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

export const libraryCategoryFormSchema = z.object({
  title: z.string().min(2),
});

export const productFormSchema = z.object({
  slug: notEmptyString,
  description: notEmptyString,
  title: notEmptyString,
  seoDescription: z.string().optional(),
  seoTitle: z.string().optional(),
  price: notEmptyString,
  categoryId: z.number().optional(),
  stock: z.number().optional(),
  mediaIds: z.array(z.number()).optional(),
  variants: z
    .array(z.object({ title: z.string(), stock: z.number().optional() }))
    .optional(),
  // relatedProductIds: z.array(z.number()),
});

export const libraryFormSchema = z.object({
  slug: notEmptyString,
  body: notEmptyString,
  title: notEmptyString,
  mediaLink: notEmptyString,
  categoryId: notEmptyNumber,
  userId: notEmptyNumber,
  mediaId: notEmptyNumber,
  mediaIds: z.array(z.number()).optional(),
  relatedLibraryIds: z.array(z.number()),
  seoDescription: z.string().optional(),
  seoTitle: z.string().optional(),
  seoMediaId: z.number().optional(),
});

export const orderFormSchema = z.object({
  userId: notEmptyString,
  status: z.enum([
    "WAITING_PAYMENT",
    "IN_PROGRESS",
    "WAITING",
    "FINISHED",
    "CANCELLED",
    "REFUNDED",
    "FAILED",
    "CONCEPT",
  ]),
  invoiceFirstName: notEmptyString,
  invoiceLastName: notEmptyString,
  invoiceCompanyName: z.string(),
  invoiceOccupation: z.string(),
  invoiceBTW: z.string(),
  invoiceCountry: z.string(),
  invoiceStreet: notEmptyString,
  invoiceAddressAdditional: z.string(),
  invoicePostalCode: notEmptyString,
  invoiceEmail: notEmptyString,
  invoiceCity: notEmptyString,
  invoicePhone: notEmptyString,
  invoicePaymentMethod: z.enum(["ideal", "credit_card"]),
  invoicePaymentBank: z.string(),
  invoiceAdditionalInformation: z.string(),
  orderItems: z.array(
    z.object({
      orderId: notEmptyNumber,
      price: notEmptyString,
      productId: notEmptyNumber,
      productVariantId: notEmptyNumber,
      quantity: notEmptyNumber,
    }),
  ),
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

export const pageFormSchema = z.object({
  pathname: notEmptyString,
  name: notEmptyString,
  blocks: z.string(),
  concept: z.boolean().optional(),
  seoDescription: z.string().optional(),
  seoTitle: z.string().optional(),
  seoMediaId: z.number().optional(),
});

export const singleLink = z.object({
  pathname: z.string(),
  name: z.string(),
});

export const link = singleLink.extend({
  values: z.array(singleLink).optional(),
});

export const externalSingleLink = z.object({
  href: z.string(),
  title: z.string(),
});

export const externalLink = externalSingleLink.extend({
  values: z.array(externalSingleLink).optional(),
});

export const footerFormSchema = z.object({
  title: notEmptyString,
  mediaId: z.number().optional().nullable(),
  navigation: z.array(link),
  links: z.array(externalLink),
  socials: z.array(externalLink),
  informationLinks: z.array(externalLink),
});

export const headerFormSchema = z.object({
  mediaId: z.number().optional().nullable(),
  navigation: z.array(link).optional(),
  links: z.array(link),
});

export const cartItemFormSchema = z.object({
  cartId: notEmptyNumber,
  productId: notEmptyNumber,
  productVariantId: notEmptyNumber,
  quantity: notEmptyNumber,
});

export const lineItem = z.object({
  price: z.string(),
  quantity: z.number(),
});

export const checkoutSessionFormSchema = z.array(lineItem);
