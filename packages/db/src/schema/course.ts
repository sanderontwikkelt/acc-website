import { relations } from "drizzle-orm";
import { index, json } from "drizzle-orm/mysql-core";

import { createdAt, id, nnInt, nnVarChar, updatedAt, varChar } from "../utils";
import { mySqlTable } from "./_table";
import { media } from "./media";
import { teacher } from "./teacher";

export const course = mySqlTable(
  "course",
  {
    id,
    title: nnVarChar("title"),
    description: nnVarChar("description"),
    mediaId: nnVarChar("media_id"),
    videoLink: varChar("video_link"),
    body: json("body"),
    infoItems: json("info_items"),
    faqItems: json("faq_items"),
    buttons: json("buttons"),
    createdAt,
    updatedAt,
  },
  (t) => {
    return {
      indx0: index("media_id").on(t.mediaId),
    };
  },
);

export const courseRelations = relations(course, ({ one, many }) => ({
  media: one(media, { fields: [course.mediaId], references: [media.id] }),
  teachers: many(courseToTeacher),
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
