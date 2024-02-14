import { ReactNode } from "react";

export interface Button {
  title: string;
  href: string;
  children: ReactNode;
  mobile?: {
    children?: ReactNode;
    href?: string;
  };
}

export interface NavigationType {
  name: string;
  href: string;
}

export interface LinksType {
  title: string;
  href: string;
}

export interface ImageType {
  src: string;
  url: string;
  width: number;
  height: number;
  objectPosition?: { x: number; y: number };
}

export type HeaderType = {
  navigation: { pathname: string; name: string }[];
  links: { pathname: string; name: string }[];
  media: { url: string; width: number; height: number };
};

export type FooterType = {
  navigation: { pathname: string; name: string }[];
  links: { pathname: string; name: string }[];
  informationLinks: { pathname: string; name: string }[];
  socials: { title: string; href: string }[];
  title: string;
};
