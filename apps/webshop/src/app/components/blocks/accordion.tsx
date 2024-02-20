import React from "react";

import { setHtml } from "~/lib/setHtml";
import Accordion from "../accordion";

const accordion = ({
  title,
  description,
  list = [],
}: {
  title: string;
  description: string;
  list: { title: string; description: string }[];
}) => {
  return (
    <div className="">
      <h2
        className="text-2m mb-24 max-w-[23rem] md:text-5xl"
        {...setHtml(title)}
      />
      <div className="md:pl-[12.5rem]">
        {list.map((item) => (
          <Accordion key={item.title} {...item} />
        ))}
        <p className="mt-10 text-lg" {...setHtml(description)} />
      </div>
    </div>
  );
};

export default accordion;
