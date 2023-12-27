import Content from "@/components/blocks/content"
import Faqs from "@/components/blocks/faqs"
import Hero from "@/components/blocks/hero"
import Testimonial from "@/components/blocks/testimonial"

export interface Block {
  fieldValues: {
    [key: string]: any
  }
  id: string
  name: "hero" | "testimonial"
  variant?: string
}

const hero = {
  label: "Hero",
  description:
    "Combine engaging imagery and concise text to convey the site's purpose.",
  fields: {
    title: {
      label: "Hero title",
      type: "string",
    },
    description: {
      label: "Hero description",
      type: "text",
    },
    button1: {
      label: "Primary Button",
      type: "component",
      fields: {
        title: { type: "string" },
        href: { type: "string" },
        target: { type: "select" },
      },
    },
    button2: {
      label: "Secondary Button",
      type: "component",
      fields: {
        title: { type: "string" },
        href: { type: "string" },
        target: { type: "select" },
      },
    },
    image: {
      label: "Background image",
      type: "image",
      existsOnVariants: ["withBackgroundImage"],
    },
  },
  defaultFieldValues: {
    title: "Data to enrich your online business",
    description:
      "Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo. Elit sunt amet fugiat veniam occaecat fugiat aliqua.",
    button1: {
      title: "Start now!",
      href: "#",
    },
    subtitle: "Announcing our next round of funding.",
    subtitleButton: {
      title: "Read more",
      href: "#",
    },
    button2: {
      title: "Learn more",
      href: "#",
    },
    image: "/empty.png",
  },
  previewurl: "/images/block/hero.png",
  component: Hero,
  variants: [
    { value: "Default", key: "default" },
    { value: "With background image", key: "withBackgroundImage" },
  ],
}

const content = {
  label: "Content",
  description:
    "Combine engaging imagery and concise text to convey the site's purpose.",
  fields: {
    title: {
      label: "Content title",
      type: "string",
    },
    description: {
      label: "Content description",
      type: "text",
    },
    button: {
      label: "Primary Button",
      type: "component",
      fields: {
        title: { type: "string" },
        href: { type: "string" },
        target: { type: "select" },
      },
    },
    image1: {
      label: "Image 1",
      type: "image",
    },
    image2: {
      label: "Image 2",
      type: "image",
    },
    image3: {
      label: "Image 3",
      type: "image",
    },
    image4: {
      label: "Image 4",
      type: "image",
    },
  },
  defaultFieldValues: {
    title: "Our people",
    description: `Quasi est quaerat. Sit molestiae et. Provident ad dolorem occaecati eos iste. Soluta rerum quidem minus ut molestiae velit error quod. Excepturi quidem expedita molestias quas.

      Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo. Elit sunt amet fugiat veniam occaecat fugiat. Quasi aperiam sit non sit neque reprehenderit.`,
    button: {
      title: "Start now!",
      href: "#",
    },
    image1:
      "https://images.unsplash.com/photo-1670272502246-768d249768ca?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1152&q=80",
    image2:
      "https://images.unsplash.com/photo-1605656816944-971cd5c1407f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=768&h=604&q=80",
    image3:
      "https://images.unsplash.com/photo-1568992687947-868a62a9f521?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1152&h=842&q=80",
    image4:
      "https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=768&h=604&q=80",
  },
  previewurl: "/images/block/content.png",
  component: Content,
  variants: [
    { value: "Default", key: "default" },
    { value: "With background image", key: "withBackgroundImage" },
  ],
}

const testimonial = {
  label: "Testimonials",
  description:
    "Showcases positive feedback and reviews from satisfied customers or clients.",
  fields: {
    authorTitle: {
      label: "Author title",
      type: "string",
    },
    authorDescription: {
      label: "Author description",
      type: "string",
    },
    testimonial: {
      label: "Testimonial",
      type: "text",
    },
  },
  defaultFieldValues: {
    authorTitle: "Judith Black",
    authorDescription: "CEO of Workcation",
    testimonial:
      "Gravida quam mi erat tortor neque molestie. Auctor aliquet at porttitor a enim nunc suscipit tincidunt nunc. Et non lorem tortor posuere. Nunc eu scelerisque interdum eget tellus non nibh scelerisque bibendum.",
    image:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2102&q=80",
  },
  previewurl: "/images/block/testimonials.png",
  component: Testimonial,
  variants: [{ value: "Default", key: "default" }],
}

const faq = {
  label: "FAQs",
  description:
    "Showcases positive feedback and reviews from satisfied customers or clients.",
  fields: {
    title: {
      label: "FAQ title",
      type: "string",
    },
    description: {
      label: "FAQ description",
      type: "text",
    },
    faqs: {
      label: "FAQs",
      type: "list",
      listItems: {
        title: true,
        description: true,
      },
    },
  },
  defaultFieldValues: {
    title: "Frequently asked questions",
    description:
      "Have a different question and can’t find the answer you’re looking for? Reach out to our support team by sending us an email and we’ll get back to you as soon as we can.",
    faqs: [
      {
        title: "What's the best thing about Switzerland?",
        description:
          "I don't know, but the flag is a big plus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.",
      },
      {
        title: "How do you make holy water?",
        description:
          "You boil the hell out of it. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.",
      },
      {
        title: "Why do you never see elephants hiding in trees?",
        description:
          "Because they're so good at it. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.",
      },
      {
        title: "How do you make holy water?",
        description:
          "Because they're so good at it. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.",
      },
      {
        title: "How do you make holy water?",
        description:
          "Because they're so good at it. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.",
      },
      {
        title: "How do you make holy water?",
        description:
          "Because they're so good at it. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.",
      },
    ],
  },
  previewurl: "/images/block/faq.png",
  component: Faqs,
  variants: [{ value: "Default", key: "default" }],
}

export const blocks = {
  hero,
  content,
  testimonial,
  faq,
}
