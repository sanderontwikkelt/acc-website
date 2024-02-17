import React from "react";

import { cn } from "@acme/ui";

import { setHtml } from "~/lib/setHtml";
import { Align, Button as ButtonType } from "~/lib/types";
import { Button } from "../button";

const heading = ({
  children,
  description,
  as = "h2",
  button,
  subtitle,
  subtitleTextAlign,
  descriptionTextAlign,
  headingTextAlign,
  buttonAlign,
}: {
  children: string;
  subtitle?: string;
  description?: string;
  as: "h2" | "h1";
  button: ButtonType;
  subtitleTextAlign?: Align;
  descriptionTextAlign?: Align;
  headingTextAlign?: Align;
  buttonAlign?: Align;
}) => {
  const Comp = as;
  return (
    <div className="flex flex-col">
      <p
        className={cn(
          "text-lg",
          subtitleTextAlign === "center"
            ? "mx-auto text-center"
            : subtitleTextAlign === "right"
              ? "ml-auto text-right"
              : "text-left",
        )}
        {...setHtml(subtitle)}
      />
      <Comp
        className={cn(
          "max-w-[42.5rem]",
          button ? "max-w-[56rem]" : "",
          headingTextAlign === "center"
            ? "mx-auto text-center"
            : headingTextAlign === "right"
              ? "ml-auto text-right"
              : "text-left",
        )}
        {...setHtml(children)}
      />
      {!!description && (
        <p
          className={cn(
            "mt-5 max-w-[62.5rem] text-xl md:text-[34px] md:leading-[44px]",
            descriptionTextAlign === "center"
              ? "mx-auto text-center"
              : descriptionTextAlign === "right"
                ? "ml-auto text-right"
                : "text-left",
            button?.title ? "mb-10" : "",
          )}
          {...setHtml(description)}
        />
      )}
      {!!button?.title && (
        <Button
          className={cn(
            "mt-4 w-min",
            buttonAlign === "center"
              ? "mx-auto"
              : buttonAlign === "right"
                ? "ml-auto"
                : "",
          )}
          size="lg"
          {...button}
        >
          {button.title}
        </Button>
      )}
    </div>
  );
};

export default heading;
