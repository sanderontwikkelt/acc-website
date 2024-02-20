import { z } from "zod";

import {
  formButton,
  notEmptyNumber,
  notEmptyString,
  optionalNumber,
  optionalString,
} from "./utils";

export const CreatePostSchema = z.object({
  title: z.string().min(1),
  content: z.string().min(1),
});

export const userFormSchema = z.object({
  name: notEmptyString,
  roleId: notEmptyNumber,
  email: z.string().email({ message: "Vul een geldig e-mail in." }),
});

export const courseFormSchema = z.object({
  title: notEmptyString,
  slug: notEmptyString,
  description: notEmptyString,
  mediaId: notEmptyNumber,
  videoLink: optionalString,
  body: notEmptyString,
  infoItems: z
    .array(z.object({ title: z.string(), description: z.string() }))
    .optional(),
  faqItems: z
    .array(z.object({ title: z.string(), description: z.string() }))
    .optional(),
  buttons: z.array(formButton).optional(),
  ctaTitle: notEmptyString,
  ctaButton: formButton,
  teacherIds: z.array(z.number()).optional(),
  seoDescription: optionalString,
  seoTitle: optionalString,
  seoMediaId: optionalNumber,
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
  title: notEmptyString,
  name: notEmptyString,
  description: notEmptyString,
  mediaId: notEmptyNumber,
  address: optionalString,
  website: optionalString,
  phoneNumber: optionalString,
  lat: optionalString,
  lng: optionalString,
  email: z.string().email().optional(),
});

export const CreateRoleSchema = z.object({
  name: notEmptyString,
  description: notEmptyString.nullable(),
  permissionIds: z.array(z.string()),
});

export const roleFormSchema = z.object({
  name: notEmptyString,
  description: notEmptyString.nullable(),
  permissionIds: z.array(z.number()),
});

export const productCategoryFormSchema = z.object({
  title: notEmptyString,
  slug: notEmptyString,
});

export const libraryCategoryFormSchema = z.object({
  title: notEmptyString,
  slug: notEmptyString,
});

export const productFormSchema = z.object({
  slug: notEmptyString,
  description: notEmptyString,
  title: notEmptyString,
  seoDescription: optionalString,
  seoTitle: optionalString,
  price: notEmptyNumber,
  categoryId: optionalNumber,
  stock: optionalNumber,
  mediaIds: z.array(z.number()).optional(),
  variants: z
    .array(z.object({ title: z.string(), stock: optionalNumber }))
    .optional(),
  paymentPlans: z
    .array(
      z.object({
        rate: optionalNumber,
        frequency: optionalString,
        length: optionalNumber,
        price: optionalNumber,
      }),
    )
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
  relatedLibraryIds: z.array(z.number()).optional(),
  type: optionalString,
  seoDescription: optionalString,
  seoTitle: optionalString,
  seoMediaId: optionalNumber,
});

export const orderFormSchema = z.object({
  // status: z.enum([
  //   "WAITING_PAYMENT",
  //   "IN_PROGRESS",
  //   "WAITING",
  //   "FINISHED",
  //   "CANCELLED",
  //   "REFUNDED",
  //   "FAILED",
  //   "CONCEPT",
  // ]),
  invoiceFirstName: notEmptyString,
  invoiceLastName: notEmptyString,
  invoiceCompanyName: optionalString,
  invoiceOccupation: optionalString,
  invoiceBTW: optionalString,
  invoiceCountry: optionalString,
  invoiceStreet: notEmptyString,
  invoiceAddressAdditional: optionalString,
  invoicePostalCode: notEmptyString,
  invoiceEmail: notEmptyString,
  invoiceCity: notEmptyString,
  invoicePhone: notEmptyString,
  invoicePaymentMethod: z.enum(["ideal", "creditcard"]),
  invoicePaymentBank: optionalString,
  invoiceAdditionalInformation: optionalString,
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
  seoDescription: optionalString,
  seoTitle: optionalString,
  seoMediaId: optionalNumber,
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
  mediaId: optionalNumber.nullable(),
  navigation: z.array(link),
  links: z.array(externalLink),
  socials: z.array(externalLink),
  informationLinks: z.array(externalLink),
});

export const headerFormSchema = z.object({
  mediaId: optionalNumber.nullable(),
  navigation: z.array(link).optional(),
  links: z.array(link),
});

export const cartItemFormSchema = z.object({
  cartId: notEmptyNumber,
  productId: notEmptyNumber,
  productVariantId: notEmptyNumber,
  quantity: notEmptyNumber,
});

export const ownCartItemFormSchema = z.object({
  productId: notEmptyNumber,
  productVariantId: notEmptyNumber,
  quantity: notEmptyNumber,
});

export const lineItem = z.object({
  price: z.string(),
  quantity: z.number(),
});

export const checkoutSessionFormSchema = z.array(lineItem);
