import { relations } from "drizzle-orm";
import { index, text } from "drizzle-orm/mysql-core";

import { mySqlTable } from "./_table";
import { media } from "./media";
import { course } from "./course";
import { createdAt, nnInt, id, updatedAt, varChar } from "../utils";

export const teacher = mySqlTable('Teacher', { 
  id,
  title: varChar("title"),
  name: varChar("name"),
  description: text("description"),
  mediaId: nnInt("mediaId"),
  createdAt,
  updatedAt,
  }, (t) => { return { 
  indx0: index('mediaId').on(t.mediaId) ,
  }}); 

  export const teacherRelations = relations(teacher,({one, many}) =>({ 
  media: one(media, { fields: [teacher.mediaId], references: [media.id]}),
  courses: many(course),
  })); 