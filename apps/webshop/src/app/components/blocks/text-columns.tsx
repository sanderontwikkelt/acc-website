import React from "react";

import { setHtml } from "~/lib/setHtml";

const TextColumns = ({
  title,
  list,
}: {
  title: string;
  list: { title: string; description: string }[];
}) => {
  return (
    <>
      <h2
        className="mb-10 text-4xl font-bold md:mb-[7.5rem] md:text-[2.5rem] md:leading-[1]"
        {...setHtml(title)}
      />
      <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-x-[6.25rem] md:gap-y-28 md:pl-[12.5rem]">
        {list.map(({ title, description }, i: number) => (
          <div key={i}>
            <h3
              className="mb-7 text-xl font-medium md:text-5xl"
              {...setHtml(title)}
            />
            <p
              className="text-sm opacity-70 md:text-lg"
              {...setHtml(description)}
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default TextColumns;
