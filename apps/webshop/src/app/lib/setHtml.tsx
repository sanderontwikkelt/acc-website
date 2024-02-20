import { isSupported, sanitize } from "isomorphic-dompurify";

export const setHtml = (html = "") => ({
  dangerouslySetInnerHTML: { __html: isSupported ? sanitize(html) : html },
  children: ""
});
