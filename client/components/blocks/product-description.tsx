import React from "react";
import { Button as ButtonType } from "@/lib/types";
import Expandable from "../expandable";
import { setHtml } from "@/lib/setHtml";
import Link from "next/link";
import { Button } from "../button";
import VideoIframe from "./video-iframe";
import Accordion from "../accordion";
import Teachers from "../teachers";

const Reviews = () => (
  <svg
    width="190"
    height="29"
    viewBox="0 0 190 29"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M82.3223 7.16736L85.2896 13.4897L92.7076 14.3823C93.02 14.4567 93.098 14.7542 92.8638 14.9773L87.554 19.6633L88.9595 26.5807C88.9595 26.8783 88.6472 27.1014 88.413 26.9527L82.0881 23.5311L75.607 26.9527C75.2947 27.1014 75.0604 26.8783 75.0604 26.5807L76.544 19.8121L71.0781 14.9773C70.9219 14.7542 71 14.4567 71.3123 14.3823L78.4962 13.6385L81.6976 7.16736C81.8538 6.94421 82.1662 6.94421 82.3223 7.16736"
      fill="#2ADC84"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M106.322 7.16736L109.29 13.4897L116.708 14.3823C117.02 14.4567 117.098 14.7542 116.864 14.9773L111.554 19.6633L112.96 26.5807C112.96 26.8783 112.647 27.1014 112.413 26.9527L106.088 23.5311L99.607 26.9527C99.2947 27.1014 99.0604 26.8783 99.0604 26.5807L100.544 19.8121L95.0781 14.9773C94.9219 14.7542 95 14.4567 95.3123 14.3823L102.496 13.6385L105.698 7.16736C105.854 6.94421 106.166 6.94421 106.322 7.16736"
      fill="#2ADC84"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M130.322 7.16736L133.29 13.4897L140.708 14.3823C141.02 14.4567 141.098 14.7542 140.864 14.9773L135.554 19.6633L136.96 26.5807C136.96 26.8783 136.647 27.1014 136.413 26.9527L130.088 23.5311L123.607 26.9527C123.295 27.1014 123.06 26.8783 123.06 26.5807L124.544 19.8121L119.078 14.9773C118.922 14.7542 119 14.4567 119.312 14.3823L126.496 13.6385L129.698 7.16736C129.854 6.94421 130.166 6.94421 130.322 7.16736"
      fill="#2ADC84"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M155.322 7.16736L158.29 13.4897L165.708 14.3823C166.02 14.4567 166.098 14.7542 165.864 14.9773L160.554 19.6633L161.96 26.5807C161.96 26.8783 161.647 27.1014 161.413 26.9527L155.088 23.5311L148.607 26.9527C148.295 27.1014 148.06 26.8783 148.06 26.5807L149.544 19.8121L144.078 14.9773C143.922 14.7542 144 14.4567 144.312 14.3823L151.496 13.6385L154.698 7.16736C154.854 6.94421 155.166 6.94421 155.322 7.16736"
      fill="#2ADC84"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M179.322 7.16736L182.29 13.4897L189.708 14.3823C190.02 14.4567 190.098 14.7542 189.864 14.9773L184.554 19.6633L185.96 26.5807C185.96 26.8783 185.647 27.1014 185.413 26.9527L179.088 23.5311L172.607 26.9527C172.295 27.1014 172.06 26.8783 172.06 26.5807L173.544 19.8121L168.078 14.9773C167.922 14.7542 168 14.4567 168.312 14.3823L175.496 13.6385L178.698 7.16736C178.854 6.94421 179.166 6.94421 179.322 7.16736"
      fill="#2ADC84"
    />
    <path
      d="M3.94141 20.8711C4.17578 22.8763 5.10677 24.263 6.73438 25.0312C7.56771 25.4219 8.53125 25.6172 9.625 25.6172C11.7083 25.6172 13.2513 24.9531 14.2539 23.625C15.2565 22.2969 15.7578 20.8255 15.7578 19.2109C15.7578 17.2578 15.1589 15.7474 13.9609 14.6797C12.776 13.612 11.3503 13.0781 9.68359 13.0781C8.47266 13.0781 7.43099 13.3125 6.55859 13.7812C5.69922 14.25 4.96354 14.901 4.35156 15.7344L1.30469 15.5586L3.43359 0.5H17.9648V3.89844H6.07031L4.87891 11.6719C5.52995 11.1771 6.14844 10.806 6.73438 10.5586C7.77604 10.1289 8.98047 9.91406 10.3477 9.91406C12.9128 9.91406 15.0872 10.7409 16.8711 12.3945C18.6549 14.0482 19.5469 16.1445 19.5469 18.6836C19.5469 21.3268 18.7266 23.6576 17.0859 25.6758C15.4583 27.694 12.8542 28.7031 9.27344 28.7031C6.99479 28.7031 4.97656 28.0651 3.21875 26.7891C1.47396 25.5 0.497396 23.5273 0.289062 20.8711H3.94141Z"
      fill="#2ADC84"
    />
  </svg>
);

const ProductDescription = ({
  descriptionTitle,
  descriptionDescription,
  descriptionVideoSrc,
  listTitle,
  listItems,
  teachersTitle,
  teachersItems,
  reviewsTitle,
  buttons,
}: {
  descriptionTitle: string;
  descriptionDescription: string;
  descriptionVideoSrc: string;
  listTitle: string;
  listItems: { title: string; description: string }[];
  teachersTitle: string;
  teachersItems: string[];
  reviewsTitle: string;
  buttons: ButtonType[];
}) => {
  const sections = [
    { title: descriptionTitle, id: "description" },
    { title: listTitle, id: "information" },
    { title: teachersTitle, id: "teachers" },
    { title: reviewsTitle, id: "reviews" },
    { title: "FAQ", id: "faq" },
  ];
  return (
    <div className="relative flex gap-10 max-md:flex-col md:gap-28">
      <aside className="h-min md:sticky md:top-32">
        {sections.map(({ title, id }) => (
          <Link
            href={`#${id}`}
            className="text-md block h-11 md:text-lg"
            key={id}
          >
            {title}
          </Link>
        ))}
        <div className="mt-12 space-y-2">
          {buttons.map((button) => (
            <Button className="w-full" {...button}>
              {button.title}
            </Button>
          ))}
        </div>
      </aside>
      <div className="flex flex-grow flex-col space-y-10 md:space-y-24">
        <div id={sections[0].id}>
          <Reviews />

          <h3 className="mb-12 mt-4" {...setHtml(sections[0].title)} />
          <Expandable maxHeight="200px">
            <p {...setHtml(descriptionDescription)} />
          </Expandable>
          {descriptionVideoSrc && (
            <div className="py-16 md:py-40">
              <VideoIframe src={descriptionVideoSrc} />
            </div>
          )}
        </div>
        <div id={sections[1].id}>
          <h3 className="mb-6" {...setHtml(sections[1].title)} />
          {listItems.map((item) => (
            <Accordion key={item.title} {...item} />
          ))}
        </div>
        <div id={sections[2].id}>
          <h3 className="mb-6" {...setHtml(sections[2].title)} />
          <div className="space-y-8">
            <Teachers ids={teachersItems?.filter(Boolean) || []} />
          </div>
        </div>
        <div id={sections[3].id}>
          <h3 className="mb-6" {...setHtml(sections[3].title)} />
          <Reviews />
        </div>
      </div>
    </div>
  );
};

export default ProductDescription;
