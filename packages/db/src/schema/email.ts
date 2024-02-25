import { createdAt, id, nnVarChar, updatedAt } from "../utils";
import { mySqlTable } from "./_table";

export const email = mySqlTable("email", {
  id,
  subject: nnVarChar("subject"),
  to: nnVarChar("to"),
  type: nnVarChar("type"),
  mailId: nnVarChar("mail_id"),
  createdAt,
  updatedAt,
});
