import { relations } from "drizzle-orm";
import { index, int, text } from "drizzle-orm/mysql-core";

import { seo } from ".";
import { createdAt, id, nnInt, nnVarChar, updatedAt, varChar } from "../utils";
import { mySqlTable } from "./_table";
import { user } from "./auth";
import { media } from "./media";

export const library = mySqlTable(
  "library",
  {
    id,
    slug: varChar("slug"),
    title: varChar("title"),
    body: text("body"),
    mediaLink: varChar("media_link"),
    mediaId: nnInt("media_id"),
    userId: nnInt("user_id"),
    type: varChar("type"),
    seoTitle: varChar("seo_title"),
    seoDescription: text("seo_description"),
    seoMediaId: int("seo_media_id"),
    categoryId: nnInt("category_id"),
    createdAt,
    updatedAt,
  },
  (t) => {
    return {
      indx0: index("media_id").on(t.mediaId),
      indx1: index("user_id").on(t.userId),
      indx2: index("seo_media_id").on(t.seoMediaId),
      indx3: index("categoryId_id").on(t.categoryId),
    };
  },
);

export const libraryRelations = relations(library, ({ one, many }) => ({
  media: one(media, { fields: [library.mediaId], references: [media.id] }),
  user: one(user, { fields: [library.userId], references: [user.id] }),
  seoMedia: one(seo, { fields: [library.seoMediaId], references: [seo.id] }),
  relatedLibraries: many(relatedLibrary, { relationName: "parentLibrary" }),
  category: one(libraryCategory, {
    fields: [library.categoryId],
    references: [libraryCategory.id],
    relationName: "libraryCategory",
  }),
}));

export const relatedLibrary = mySqlTable("relatedLibrary", {
  libraryId: nnInt("library_id"),
  relatedLibraryId: nnInt("related_library_id"),
});

export const relatedLibraryRelations = relations(relatedLibrary, ({ one }) => ({
  library: one(library, {
    fields: [relatedLibrary.libraryId],
    references: [library.id],
    relationName: "parentLibrary",
  }),
  relatedLibrary: one(library, {
    fields: [relatedLibrary.relatedLibraryId],
    references: [library.id],
    relationName: "relatedLibrary",
  }),
}));

export const libraryCategory = mySqlTable("libraryCategory", {
  id,
  title: nnVarChar("title"),
  slug: nnVarChar("slug"),
  createdAt,
  updatedAt,
});

export const libraryCategoryRelations = relations(
  libraryCategory,
  ({ many }) => ({
    libraries: many(library),
  }),
);
