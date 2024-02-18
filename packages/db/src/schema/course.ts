import { relations } from "drizzle-orm";
import { boolean, index, int, json, text } from "drizzle-orm/mysql-core";

import { seo } from ".";
import {
  createdAt,
  id,
  nnInt,
  nnText,
  nnVarChar,
  updatedAt,
  varChar,
} from "../utils";
import { mySqlTable } from "./_table";
import { media } from "./media";
import { teacher } from "./teacher";

export const course = mySqlTable(
  "course",
  {
    id,
    title: nnVarChar("title"),
    slug: nnVarChar("slug"),
    concept: boolean("concept").default(true),
    description: nnText("description"),
    mediaId: nnInt("media_id"),
    videoLink: varChar("video_link"),
    ctaTitle: varChar("cta_title"),
    ctaButton: json("cta_button"),
    body: json("body"),
    seoTitle: varChar("seo_title"),
    seoDescription: text("seo_description"),
    seoMediaId: int("seo_media_id"),
    infoItems: json("info_items"),
    faqItems: json("faq_items"),
    buttons: json("buttons"),
    createdAt,
    updatedAt,
  },
  (t) => {
    return {
      indx0: index("media_id").on(t.mediaId),
      indx1: index("seo_media_id").on(t.seoMediaId),
    };
  },
);

export const courseRelations = relations(course, ({ one, many }) => ({
  media: one(media, { fields: [course.mediaId], references: [media.id] }),
  teachers: many(courseToTeacher),
  seoMedia: one(seo, { fields: [course.seoMediaId], references: [seo.id] }),
}));

export const courseToTeacher = mySqlTable("courseToTeacher", {
  courseId: nnInt("course_id"),
  teacherId: nnInt("teacher_id"),
});

export const courseToTeacherRelations = relations(
  courseToTeacher,
  ({ one }) => ({
    course: one(course, {
      fields: [courseToTeacher.courseId],
      references: [course.id],
      relationName: "teacherCourse",
    }),
    teacher: one(teacher, {
      fields: [courseToTeacher.teacherId],
      references: [teacher.id],
      relationName: "courseTeacher",
    }),
  }),
);
