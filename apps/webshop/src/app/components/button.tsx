import type { VariantProps } from "class-variance-authority";
import * as React from "react";
import Link from "next/link";
import { cva } from "class-variance-authority";

import { cn } from "@acme/ui";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap px-6 text-base font-semibold ring-offset-background transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "hover:bg-main bg-primary text-white",
        accent: "text-main hover:bg-main bg-accent hover:text-white",
        main: "bg-main h-[75px] scale-100 px-12 text-lg text-white transition-transform duration-300 hover:scale-105",
        success:
          "h-[75px] scale-100 bg-[#2ADC84] px-12 text-lg text-white transition-transform duration-300 hover:scale-105",
        outline:
          "border-main hover:bg-main border-2 bg-transparent hover:text-white",
        link: "px-0 text-lg font-normal underline underline-offset-4",
      },
      rounded: {
        default: "rounded-none",
        sm: "rounded-sm",
        md: "rounded-md",
      },
      size: {
        default: "h-10",
        lg: "h-[75px]",
      },
    },
    defaultVariants: {
      variant: "default",
      rounded: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLAnchorElement | HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  withArrow?: boolean;
  href?: string;
  target?: string;
  mobile?: {
    children?: React.ReactNode;
    href?: string;
  };
}

const Button = ({
  className,
  variant,
  rounded,
  size,
  asChild = false,
  href,
  type,
  children,
  withArrow,
  mobile,
  ...props
}: ButtonProps) => {
  const slot = (
    <div>
      <span className={mobile?.children ? "" : "hidden"}>
        {mobile?.children}
      </span>
      <span className={mobile?.children ? "hidden" : ""}>{children}</span>
      {!!withArrow && (
        <div className="ml-[0.625rem] inline-block">
          <svg
            height="2"
            viewBox="0 0 100 2"
            preserveAspectRatio="none"
            className="stroke-main -mr-[6px] -mt-[0.6px] inline-block w-4 transition-all duration-300 group-hover:w-8 group-hover:stroke-primary"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M0 1L100 1" strokeWidth="1.3" strokeLinecap="round" />
          </svg>
          <svg
            width="8"
            height="16"
            className="fill-main inline-block duration-300 group-hover:fill-primary"
            viewBox="0 0 8 16"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M6.95828 8.42255L1.03288 15.2969C0.915017 15.4336 0.722147 15.5 0.593567 15.5C0.451201 15.5 0.308262 15.4463 0.194969 15.3377C-0.0469405 15.1057 -0.0648703 14.7104 0.155037 14.4553L5.17959 8.62565C5.17959 8.62565 5.51035 8.31032 5.51035 8C5.51035 7.68968 5.17923 7.37577 5.17923 7.37577L0.153895 1.54429C-0.0660128 1.2892 -0.048083 0.893576 0.193826 0.661957C0.436307 0.431276 0.810653 0.448344 1.03138 0.704687L6.95678 7.57903C7.16187 7.81714 7.16187 8.18429 6.95828 8.42255Z" />
          </svg>
        </div>
      )}
    </div>
  );

  const commonProps = {
    className: cn(
      buttonVariants({ variant, rounded, size, className }),
      withArrow ? "group" : "",
    ),
    ...props,
  };
  if (type === "submit") {
    return (
      <button {...commonProps} type={type}>
        {slot}
      </button>
    );
  }
  return (
    <Link href={href || "#"} {...commonProps}>
      {slot}
    </Link>
  );
};
Button.displayName = "Button";

export { Button, buttonVariants };
