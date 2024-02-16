import accordion from "~/components/blocks/accordion";
import card from "~/components/blocks/card";
import content from "~/components/blocks/content";
import contentImages from "~/components/blocks/contentImages";
import ctaContent from "~/components/blocks/cta-content";
import googleMap from "~/components/blocks/google-map";
import heading from "~/components/blocks/heading";
import hero from "~/components/blocks/hero";
import images from "~/components/blocks/images";
import productDescription from "~/components/blocks/product-description";
import testimonials from "~/components/blocks/testimonials";
import textColumns from "~/components/blocks/text-columns";
import videoIframe from "~/components/blocks/video-iframe";
import contactForm from "~/components/blocks/contact-form";

export interface Block {
  fields: any;
  name: "hero" | "content";
  style?: any;
  innerStyle?: any;
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
};
