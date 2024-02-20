import React from "react";

import type { Button as ButtonType } from "~/lib/types";
import { Button } from "../button";

const callToAction = ({
  title,
  button,
}: {
  title: string;
  button: ButtonType;
}) => {
  return (
    <div
      className="bg-main relative z-10 -mt-[60px] flex w-full items-center justify-between p-4 text-white max-md:flex-col"
      style={{
        boxShadow: "-10px 54px 33px -28px rgba(0, 0, 0, 0.27)",
      }}
    >
      <p className="text-xl max-md:mx-auto max-md:mb-4 max-md:text-center md:pl-4 md:text-3xl">
        {title}
      </p>
      <Button {...button} className="max-md:w-full">
        {button.title}
      </Button>
    </div>
  );
};

export default callToAction;
