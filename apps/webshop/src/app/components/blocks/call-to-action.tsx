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
    <div className="bg-main -mt-[60px] flex w-full items-center justify-between p-4 text-white max-md:flex-col">
      <p className="pl-4 text-xl max-md:mx-auto max-md:text-center md:text-3xl">
        {title}
      </p>
      <Button {...button} className="max-md:w-full">
        {button.title}
      </Button>
    </div>
  );
};

export default callToAction;
