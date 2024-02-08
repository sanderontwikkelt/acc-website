import React from "react";

import { setHtml } from "~/lib/setHtml";

const Article = ({
  title,
  description,
  className = "",
}: {
  title: string;
  description: string;
  className?: string;
}) => {
  return (
    <article className={className}>
      <h4 className="mb-8 text-2xl font-bold" {...setHtml(title)} />
      <p className="mb-0 whitespace-pre-line" {...setHtml(description)} />
    </article>
  );
};

export default Article;
