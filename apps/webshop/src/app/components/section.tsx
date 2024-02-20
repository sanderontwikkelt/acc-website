import type { CSSProperties, ReactNode } from "react";

import { cn } from "@acme/ui";

import SectionBuilder from "./section-builder";

const Section = ({
  children,
  maxWidth = 1240,
  className,
  innerClassName,
  asChild,
  client,
  innerStyle,
  fields,
  id,
  label,
  innerId,
  ...props
}: {
  children: ReactNode;
  style?: CSSProperties;
  innerStyle?: CSSProperties;
  fields?: { background?: string };
  maxWidth?: number | string;
  className?: string;
  innerId?: string;
  id: string;
  label?: string;
  innerClassName?: string;
  asChild?: boolean;
  client?: boolean;
}) => {
  return asChild ? (
    children
  ) : (
    <section
      className={cn(
        "group/client block w-full px-[1.25rem] md:px-[6.25rem]",
        className,
        fields?.background ? `bg-[${fields.background}]` : "",
      )}
      {...props}
      style={{ backgroundColor: fields?.background || "", ...props.style }}
    >
      {client && innerId && (
        <SectionBuilder id={id || ""} label={label || ""} />
      )}
      <div
        className={cn(
          "mx-auto w-full py-10 md:py-24",
          innerClassName,
          innerStyle?.paddingTop === "0px" ? "scroll-m-[6.25rem]" : "",
        )}
        style={{ maxWidth: maxWidth || 1240, ...innerStyle }}
        id={innerId}
      >
        {children}
      </div>
    </section>
  );
};

export default Section;
