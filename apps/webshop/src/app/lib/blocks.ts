import type { CSSProperties } from "react";

import accordion from "~/components/blocks/accordion";
import callToAction from "~/components/blocks/call-to-action";
import card from "~/components/blocks/card";
import contactForm from "~/components/blocks/contact-form";
import content from "~/components/blocks/content";
import contentImage from "~/components/blocks/content-image";
import contentImages from "~/components/blocks/contentImages";
import coursesPreview from "~/components/blocks/courses-preview";
import ctaContent from "~/components/blocks/cta-content";
import googleMap from "~/components/blocks/google-map";
import heading from "~/components/blocks/heading";
import hero from "~/components/blocks/hero";
import images from "~/components/blocks/images";
import libraryPreview from "~/components/blocks/library-preview";
import productDescription from "~/components/blocks/product-description";
import testimonials from "~/components/blocks/testimonials";
import textColumns from "~/components/blocks/text-columns";
import videoIframe from "~/components/blocks/video-iframe";

export interface Block {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  fields: any;
  name: "hero" | "content";
  style?: CSSProperties;
  innerStyle?: CSSProperties;
  id: string;
  uid: string;
  label: string;
}

export const blocks = {
  hero,
  content,
  heading,
  contentImages,
  testimonials,
  ctaContent,
  accordion,
  card,
  textColumns,
  images,
  videoIframe,
  googleMap,
  contactForm,
  productDescription,
  libraryPreview,
  coursesPreview,
  callToAction,
  contentImage,
};
