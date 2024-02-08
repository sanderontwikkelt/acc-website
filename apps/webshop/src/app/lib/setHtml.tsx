// import { sanitize, isSupported } from 'isomorphic-dompurify'

export const setHtml = (html = "") => ({
  dangerouslySetInnerHTML: { __html: html },
});
