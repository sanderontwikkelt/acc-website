import type { ReactNode } from "react";

export interface Button {
  title: string;
  href: string;
  children: ReactNode;
  variant?: "main";
  size?: "lg";
  mobile?: {
    children?: ReactNode;
    href?: string;
  };
}

export type Align = "left" | "center" | "right";

export interface NavigationType {
  name: string;
  href: string;
}

export interface LinksType {
  title: string;
  href: string;
  active?: boolean;
}

export interface ImageType {
  src: string;
  url: string;
  width: number;
  height: number;
  objectPosition?: { x: number; y: number };
}

export interface HeaderType {
  navigation: { pathname: string; name: string }[];
  links: { pathname: string; name: string }[];
  media: { url: string; width: number; height: number };
}

export interface FooterType {
  navigation: { pathname: string; name: string }[];
  links: { pathname: string; name: string }[];
  informationLinks: { pathname: string; name: string }[];
  socials: { title: string; href: string }[];
  title: string;
}
