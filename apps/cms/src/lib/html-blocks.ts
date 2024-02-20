interface Field {
  label: string;
  showOnVariants?: string[];
}

interface Input {
  type: "string";
  value: string;
}

interface Text {
  type: "text";
  value: string;
}

interface Image {
  type: "image";
  value: {
    src: string;
    width: number;
    height: number;
  };
}

interface Video {
  type: "video";
  value: {
    src: string;
    width: number;
    height: number;
  };
}

interface Variant {
  type: "enum";
  options: {
    key: string;
    label: string;
  }[];
  value: string;
}

interface Button {
  type: "button";
  value: {
    withArrow: boolean;
    title: string;
    href: string;
    target: "_self" | "_blank";
    variant: string;
  };
}

interface HeroType {
  name: "hero";
  fields: {
    variant?: Field & Variant;
    subtitle?: Field & Input;
    title: Field & Input;
    description: Field & Text;
    image: Field & Image;
    video: Field & Video;
    button?: Field & Button;
  };
}
export type BlockType = {
  style: React.CSSProperties;
  innerStyle: React.CSSProperties;
  label: string;
  description: string;
  previewurl: string;
  id: string;
  uid: string;
  maxWidth: string;
} & HeroType;

export const hero = {
  name: "hero" as const,
  id: "home-hero",
  label: "Hero",
  previewurl: "/images/block/hero.png",
  style: { paddingTop: 0, position: "relative" },
  fields: {
    variant: {
      label: "Variant",
      type: "enum",
      options: [
        { key: "default", label: "Standaard" },
        { key: "arrow", label: "Standaard met navigatie" },
        { key: "blog", label: "Blog" },
        { key: "full-width", label: "Volledige breedte" },
        { key: "side-image", label: "Zijafbeelding" },
      ],
      value: "blog",
    },
    background: {
      label: "Achtergrondkleur",
      type: "enum",
      options: [
        { key: "#fff", label: "Wit" },
        { key: "#E9EAEC", label: "Grijs" },
        { key: "#E6E1C9", label: "Geel" },
        { key: "#C5CEDF", label: "Blauw" },
        { key: "#0F1012", label: "Zwart" },
      ],
      value: "#E9EAEC",
    },
    title: { label: "Titel", type: "string", value: "Coaching" },
    description: {
      label: "Beschrijving",
      type: "text",
      value:
        "Wil jij jouw klanten helpen naar meer vitaliteit? Start dan met het stellen van andere vragen!",
    },
    image: {
      label: "Afbeelding",
      type: "image",
      value: {
        src: "https://storage.googleapis.com/physis_cms_storage/media/957f7bd0-1113-4b55-a4f5-5541343e178b_hero-home.jpg",
        width: 1108,
        height: 738,
        name: "hero.png",
        objectPosition: { x: 50, y: 50 },
      },
    },
    icon: {
      label: "Icoon",
      type: "image",
      showOnVariants: ["side-image"],
      value: {
        src: "https://storage.cloud.google.com/physis_cms_storage/Group%2021.svg",
        width: 62,
        height: 62,
        name: "icon.svg",
        objectPosition: { x: 50, y: 50 },
      },
    },
    links: {
      label: "Links",
      type: "links",
      showOnVariants: ["side-image"],
      value: [
        { href: "#kennis", title: "Kennis" },
        { href: "#resultaat", title: "Resultaat" },
        { href: "#ondernemen", title: "Ondernemen" },
      ],
    },
    breadcrumbs: {
      label: "Broodkruimels",
      type: "links",
      showOnVariants: ["blog"],
      value: [
        { href: "/", title: "Home" },
        { href: "#", title: "Coaching" },
      ],
    },
  },
};

export const card = {
  name: "card" as const,
  id: "home-card",
  label: "Card",
  previewurl: "/images/block/card.png",
  style: { paddingTop: 0, position: "relative" },
  fields: {
    title: { label: "Titel", type: "string", value: "Physis" },
    description: {
      label: "Beschrijving",
      type: "text",
      value:
        "Al onze vakinhoudelijke opleidingen vallen onder de noemer ‘Physis’. Interessante relaties komen naadloos samen in een enorm praktische aanpak. Wij richten ons met deze opleidingen op behandelaars en trainers die graag zo compleet mogelijk naar de klachten van hun klanten willen kijken.",
    },
    image: {
      label: "Afbeelding",
      type: "image",
      value: {
        src: "https://storage.googleapis.com/physis_cms_storage/201711_PhysisAcademy_112845_D850_DSC_1470.png",
        width: 510,
        height: 400,
        name: "card.png",
        objectPosition: { x: 50, y: 50 },
      },
    },
    icon: {
      label: "Icoon",
      type: "image",
      value: {
        src: "https://storage.googleapis.com/physis_cms_storage/success-icon.svg",
        width: 66,
        height: 51,
        name: "icon.svg",
        objectPosition: { x: 50, y: 50 },
      },
    },
    links: {
      label: "Links",
      type: "links",
      value: [
        { href: "/physis", title: "Meer informatie" },
        { href: "/physis#cursussen", title: "Cursus aanbod" },
      ],
    },
  },
};

const content = {
  name: "content" as const,
  label: "Content",
  previewurl: "/images/block/content.png",
  fields: {
    title: {
      label: "Titel",
      type: "string",
      value: "Physis Academy coach opleiding",
    },
    description: {
      label: "Beschrijving",
      type: "text",
      value:
        "De Physis Coach Opleiding is een opleiding speciaal voor behandelaars en trainers die coach willen worden. De opleiding omarmt het 6 domeinen model en word gegeven door een coach die enorm veel ervaring heeft met behandelaars en trainers.",
    },
    image: {
      label: "Afbeelding",
      type: "image",
      value: {
        name: "content.jpg",
        src: "https://storage.googleapis.com/physis_cms_storage/media/12a1fb82-bfea-45a5-99f9-0a2f2a5eaca1_home-physis.jpg",
        width: 389,
        height: 397,
      },
    },
    icon: {
      label: "Icoon",
      type: "image",
      value: {
        src: "https://storage.cloud.google.com/physis_cms_storage/Group%2021.svg",
        width: 62,
        height: 62,
        name: "icon.svg",
        objectPosition: { x: 50, y: 50 },
      },
    },
    links: {
      label: "Links",
      type: "links",
      value: [
        { href: "#", title: "Meer informatie" },
        { href: "#", title: "Cursus aanbod" },
      ],
    },
  },
};

const contentImage = {
  name: "contentImage" as const,
  label: "Afbeelding met tekst",
  previewurl: "/images/block/contentImage.png",
  fields: {
    title: {
      label: "Titel",
      type: "string",
      value: "Physis Academy coach opleiding",
    },
    description: {
      label: "Beschrijving",
      type: "text",
      value:
        "De Physis Coach Opleiding is een opleiding speciaal voor behandelaars en trainers die coach willen worden. De opleiding omarmt het 6 domeinen model en word gegeven door een coach die enorm veel ervaring heeft met behandelaars en trainers.",
    },
    image: {
      label: "Afbeelding",
      type: "image",
      value: {
        name: "content.jpg",
        src: "https://storage.googleapis.com/physis_cms_storage/media/12a1fb82-bfea-45a5-99f9-0a2f2a5eaca1_home-physis.jpg",
        width: 389,
        height: 397,
      },
    },
    button: {
      label: "Link",
      type: "button",
      value: {
        title: "Schrijf je nu in!",
        href: "/",
        target: "_self",
        size: "lg",
        variant: "success",
      },
    },
  },
};

const heading = {
  name: "heading" as const,
  label: "Koptitel",
  previewurl: "/images/block/headingWithDescription.png",
  fields: {
    subtitle: {
      label: "Subtitel",
      type: "string",
      value: "Wat we doen",
    },
    subtitleTextAlign: {
      label: "Subtitel centrering",
      type: "enum",
      options: [
        { key: "left", label: "Links" },
        { key: "center", label: "Gecentreerd" },
        { key: "right", label: "Rechts" },
      ],
      value: "left",
    },
    children: {
      label: "Titel",
      type: "string",
      value: "Business dag",
    },
    headingTextAlign: {
      label: "Titel centrering",
      type: "enum",
      options: [
        { key: "left", label: "Links" },
        { key: "center", label: "Gecentreerd" },
        { key: "right", label: "Rechts" },
      ],
      value: "left",
    },
    description: {
      label: "Beschrijving",
      type: "text",
      value:
        "Wij doen niets liever dan behandelaars en trainers leren om nog meer impact te maken op de vitaliteit van hun klanten. Wil jij elke klant zo compleet mogelijk benaderen? En naast een behandeling of training je klant meer kunnen bieden?",
    },
    descriptionTextAlign: {
      label: "Beschrijving centrering",
      type: "enum",
      options: [
        { key: "left", label: "Links" },
        { key: "center", label: "Gecentreerd" },
        { key: "right", label: "Rechts" },
      ],
      value: "left",
    },
    button: {
      label: "Link",
      type: "button",
      value: {
        title: "Aanmelden",
        href: "/",
        target: "_self",
        variant: "main",
      },
    },
    buttonAlign: {
      label: "Link centrering",
      type: "enum",
      options: [
        { key: "left", label: "Links" },
        { key: "center", label: "Gecentreerd" },
        { key: "right", label: "Rechts" },
      ],
      value: "left",
    },
  },
};

const contentImages = {
  name: "contentImages" as const,
  label: "Afbeeldingen met link",
  previewurl: "/images/block/contentImages.png",
  style: { backgroundColor: "#000", color: "#fff" },
  fields: {
    title: {
      label: "Titel",
      type: "string",
      value: "Kennis",
    },
    items: {
      label: "Afbeeldingen",
      type: "list",
      value: [
        {
          title: "Wat is een ODI? En waarom heeft dit de toekomst?",
          href: "/",
          image: {
            src: "https://storage.googleapis.com/physis_cms_storage/201711_PhysisAcademy_101313_D850_DSC_1054%20Copy.png",
            name: "kennis.jpg",
            width: 389,
            height: 302,
            objectPosition: { x: 50, y: 50 },
          },
        },
        {
          title:
            "Het moeilijk vinden om succesvol te zijn. Over doelen stellen i.c.m. het juiste tarief.",
          href: "/",
          image: {
            src: "https://storage.googleapis.com/physis_cms_storage/201711_PhysisAcademy_101313_D850_DSC_1054%20Copy.png",
            name: "kennis.jpg",
            width: 389,
            height: 302,
            objectPosition: { x: 50, y: 50 },
          },
        },
        {
          title: "Gebruik van Synthetische Stoffen",
          href: "/",
          image: {
            src: "https://storage.googleapis.com/physis_cms_storage/201711_PhysisAcademy_101313_D850_DSC_1054%20Copy.png",
            name: "kennis.jpg",
            width: 389,
            height: 302,
            objectPosition: { x: 50, y: 50 },
          },
        },
      ],
    },
    button: {
      label: "Link",
      type: "button",
      value: {
        title: "Naar bibliotheek",
        href: "/",
        target: "_self",
        variant: "link",
      },
    },
  },
};

const testimonials = {
  name: "testimonials" as const,
  label: "Getuigenissen",
  previewurl: "/images/block/testimonials.png",
  style: { backgroundColor: "#E9EAEC" },
  fields: {
    title: {
      label: "Titel",
      type: "string",
      value: "Resultaat",
    },
    items: {
      label: "Getuigenissen",
      type: "list",
      value: [
        {
          description:
            "“In drie woorden: Vitaliteit echt begrijpen! Hoe fit je je voelt is van zoveel factoren afhankelijk. Alleen een uurtje sporten en op je eten letten is lang niet genoeg. Het gaat om het hele plaatje, en dit plaatje kan Timo je haar fijn uitleggen!”",
          subtitle: "Personal trainer",
          author: "Wouter van Aalst",
          image: {
            src: "https://storage.googleapis.com/physis_cms_storage/author.png",
            name: "author.png",
            width: 136,
            height: 136,
            objectPosition: { x: 50, y: 50 },
          },
        },
        {
          description:
            "“In drie woorden: Vitaliteit echt begrijpen! Hoe fit je je voelt is van zoveel factoren afhankelijk. Alleen een uurtje sporten en op je eten letten is lang niet genoeg. Het gaat om het hele plaatje, en dit plaatje kan Timo je haar fijn uitleggen!”",
          subtitle: "Personal trainer",
          author: "Wouter van Aalst",
          image: {
            src: "https://storage.googleapis.com/physis_cms_storage/author.png",
            name: "author.png",
            width: 136,
            height: 136,
            objectPosition: { x: 50, y: 50 },
          },
        },
      ],
    },
  },
};

const ctaContent = {
  name: "ctaContent" as const,
  label: "Content met auteur",
  previewurl: "/images/block/ctaContent.png",
  fields: {
    title: {
      label: "Titel",
      type: "string",
      value: '"Ik ben liever duidelijk dan aardig"',
    },
    subtitle: {
      label: "Titel",
      type: "string",
      value:
        "Dat gevoel van ‘wij samen’, dat moment van verbinding, waar alles klopt. Dat is voor mij geluk.",
    },
    articleTitle: {
      label: "Artikel titel",
      type: "string",
      value: `Marc deelt zijn 'KODE'`,
    },
    description: {
      label: "Artikel beschrijving",
      type: "text",
      value:
        "De Physis Coach Opleiding is een opleiding speciaal voor behandelaars en trainers die coach willen worden. De opleiding omarmt het 6 domeinen model en word gegeven door een coach die enorm veel ervaring heeft met behandelaars en trainers.",
    },
    image: {
      label: "Afbeelding",
      type: "image",
      value: {
        name: "cta.png",
        src: "https://storage.googleapis.com/physis_cms_storage/cta.png",
        width: 600,
        height: 400,
      },
    },
    button: {
      label: "Link",
      type: "button",
      value: {
        title: "Lees verder",
        href: "/",
        target: "_self",
        variant: "link",
      },
    },
    authorImage: {
      label: "Auteur afbeelding",
      type: "image",
      value: {
        src: "https://storage.googleapis.com/physis_cms_storage/author.png",
        name: "author.png",
        width: 136,
        height: 136,
        objectPosition: { x: 50, y: 50 },
      },
    },
    author: {
      label: "Auteur",
      type: "input",
      value: "Marc van Lammeren",
    },
    authorDescription: {
      label: "Auteur beschrijving",
      type: "input",
      value: "Coach en Trainer",
    },
  },
};

const accordion = {
  name: "accordion" as const,
  label: "Accordion",
  id: "faq",
  previewurl: "/images/block/accordion.png",
  fields: {
    title: {
      label: "Titel",
      type: "string",
      value: `Frequently
Asked Questions`,
    },
    description: {
      label: "Titel",
      type: "text",
      value: `Frequently
Asked Questions`,
    },
    list: {
      label: "Accordion",
      type: "list",
      value: [
        {
          title:
            "Wat zijn de toelatingseisen voor de opleidingen van Physis Academy?",
          description:
            "De Coach Opleiding is speciaal ontwikkeld voor behandelaars en trainers en is daarom ook alleen toegankelijk voor deze doelgroep. Het is daarentegen niet verplicht om éérst 1 van onze andere opleidingen te volgen. Benieuwd of deze cursus ook wat voor jou is? Neem dan contact met ons op via het contactformulier op de site.",
        },
        {
          title:
            "Wat zijn de toelatingseisen voor de opleidingen van Physis Academy?",
          description:
            "De Coach Opleiding is speciaal ontwikkeld voor behandelaars en trainers en is daarom ook alleen toegankelijk voor deze doelgroep. Het is daarentegen niet verplicht om éérst 1 van onze andere opleidingen te volgen. Benieuwd of deze cursus ook wat voor jou is? Neem dan contact met ons op via het contactformulier op de site.",
        },
        {
          title:
            "Wat zijn de toelatingseisen voor de opleidingen van Physis Academy?",
          description:
            "De Coach Opleiding is speciaal ontwikkeld voor behandelaars en trainers en is daarom ook alleen toegankelijk voor deze doelgroep. Het is daarentegen niet verplicht om éérst 1 van onze andere opleidingen te volgen. Benieuwd of deze cursus ook wat voor jou is? Neem dan contact met ons op via het contactformulier op de site.",
        },
      ],
    },
  },
};

const textColumns = {
  name: "textColumns" as const,
  label: "Text kolommen",
  previewurl: "/images/block/textColumns.png",
  style: { backgroundColor: "#000", color: "#fff" },
  fields: {
    title: {
      label: "Titel",
      type: "string",
      value: `Wat wij bieden`,
    },
    list: {
      label: "Teksten",
      type: "list",
      value: [
        {
          title: "Nieuwe inzichten",
          description:
            "Onze grootste passie is het delen van kennis! Deze kennis bevat de nieuwste inzichten en unieke relaties die samen komen binnen het 6 domeinen model en uitgediept worden tijdens de Physis Academy Jaaropleiding.",
        },
        {
          title: "Veel expertise",
          description:
            "Behandelen of training geven is een enorme ambacht! De patroonherkenning, communicatie-skills en adviezen die je bij ons leert brengen je enorm veel extra expertise voor nóg sneller resultaat.",
        },
        {
          title: "Ongekende resultaten",
          description:
            "Het doorbreken van chronische pijn, mensen met een auto-immuunziekte weer veel meer kwaliteit van leven geven of mensen helpen naar een enorm hoog energie niveau? Onze opleidingen staan garant voor ongekende resultaten!",
        },
        {
          title: "Onderscheidend vermogen",
          description:
            "Door vernieuwend en completer te kijken, kun jij je enorm onderscheiden in jouw omgeving. Leer tijdens onze opleidingen en events van de Physis Specialisten die dit al jaren succesvol doen!",
        },
      ],
    },
  },
};

const images = {
  name: "images" as const,
  label: "Afbeelding Grid",
  description:
    "Combine engaging imagery and concise text to convey the site's purpose.",
  previewurl: "/images/block/images.png",
  fields: {
    items: {
      label: "Grid",
      type: "imageGrid",
      value: [
        {
          cols: 5,
          image: {
            src: "https://storage.googleapis.com/physis_cms_storage/images1.png",
            name: "Teamlid.jpg",
            width: 510,
            height: 700,
            objectPosition: { x: 50, y: 50 },
          },
        },
        {
          cols: 7,
          image: {
            src: "https://storage.googleapis.com/physis_cms_storage/images2.png",
            name: "Teamlid.jpg",
            width: 603,
            height: 448,
            objectPosition: { x: 50, y: 50 },
          },
        },
      ],
    },
  },
};

const videoIframe = {
  name: "videoIframe" as const,
  label: "Video embed",
  previewurl: "/images/block/videoIframe.png",
  fields: {
    src: {
      label: "Embed url/link",
      type: "input",
      value:
        "https://www.youtube.com/embed/laboVph7Am4?controls=1&amp;rel=0&amp;playsinline=0&amp;modestbranding=0&amp;autoplay=0&amp;enablejsapi=1&amp;origin=https%3A%2F%2Fphysis.academy&amp;widgetid=1",
    },
  },
};

const googleMap = {
  name: "googleMap" as const,
  label: "Landkaart",
  style: { padding: 0 },
  previewurl: "/images/block/googleMap.png",
  fields: {
    title: {
      label: "Titel",
      type: "string",
      value: "Een overzicht van Physis specialisten.",
    },
    placeholder: {
      label: "Zoekveld",
      type: "input",
      value: "Zoek op locatie",
    },
  },
};

const libraryPreview = {
  name: "libraryPreview" as const,
  label: "Bibliotheekitems",
  previewurl: "/images/block/libraryPreview.png",
  fields: {
    title: {
      label: "Titel",
      type: "string",
      value: "Wat kun je verwachten?",
    },
    description: {
      label: "Beschrijving",
      type: "string",
      value: "",
    },
    align: {
      label: "Centrering",
      type: "enum",
      options: [
        { key: "left", label: "Links" },
        { key: "center", label: "Gecentreerd" },
        { key: "right", label: "Rechts" },
      ],
      value: "left",
    },
    ids: {
      label: "Bibliotheek items",
      type: "libraries",
      value: [],
    },
    button: {
      label: "Link",
      type: "button",
      value: {
        title: "Naar bibliotheek",
        href: "/",
        target: "_self",
        variant: "link",
      },
    },
  },
};

const coursesPreview = {
  name: "coursesPreview" as const,
  label: "Cursussen",
  previewurl: "/images/block/coursesPreview.png",
  fields: {
    title: {
      label: "Titel",
      type: "string",
      value: "Hoofdproducten",
    },
    ids: {
      label: "Cursussen",
      type: "courses",
      value: [],
    },
  },
};

const callToAction = {
  name: "callToAction" as const,
  label: "Call to action",
  previewurl: "/images/block/callToAction.png",
  fields: {
    title: {
      label: "Titel",
      type: "string",
      value: "Wat kun je verwachten?",
    },
    button: {
      label: "Link",
      type: "button",
      value: {
        title: "Klik hier!",
        href: "/",
        target: "_self",
        size: "lg",
        variant: "white",
      },
    },
  },
};

const contactForm = {
  name: "contactForm" as const,
  label: "Contactformulier",
  previewurl: "/images/block/contact.png",
  fields: {
    title: {
      label: "Titel",
      type: "string",
      value: "Een overzicht van Physis specialisten.",
    },
    inputFirstNamePlaceholder: {
      label: "Voornaam plaatshouder",
      type: "input",
      value: "Typ een voornaam",
    },
    inputFirstNameLabel: {
      label: "Voornaam",
      type: "input",
      value: "Voornaam",
    },
    inputLastNamePlaceholder: {
      label: "Achternaam plaatshouder",
      type: "input",
      value: "Typ een achternaam",
    },
    inputLastNameLabel: {
      label: "Achternaam",
      type: "input",
      value: "Achternaam",
    },
    inputEmailPlaceholder: {
      label: "E-mail plaatshouder",
      type: "input",
      value: "Typ een ",
    },
    inputEmailLabel: {
      label: "E-mail",
      type: "input",
      value: "E-mail",
    },
    inputPhoneNumberPlaceholder: {
      label: "Telefoonnummer plaatshouder",
      type: "input",
      value: "Typ een telefoonnummer",
    },
    inputPhoneNumberLabel: {
      label: "Telefoonnummer",
      type: "input",
      value: "Telefoonnummer",
    },
    inputMessagePlaceholder: {
      label: "Bericht plaatshouder",
      type: "input",
      value: "Typ een bericht",
    },
    inputMessageLabel: {
      label: "Bericht",
      type: "input",
      value: "Bericht",
    },
    inputConsentLabel: {
      label: "Zoekveld",
      type: "text",
      value: `Ik heb de algemene voorwaarden gelezen en ga hiermee akkoord <a href="#">Privacy Policy</a>.`,
    },
    successMessage: {
      label: "Bericht na indienen",
      type: "text",
      value: `Bedankt voor je inzending! We nemen zo snel mogelijk contact me je op.`,
    },
    button: {
      label: "Knop",
      type: "button",
      value: {
        title: "Verzenden",
        href: "#",
        target: "_self",
        size: "lg",
        variant: "main",
      },
    },
    buttonAlign: {
      label: "Link centrering",
      type: "enum",
      options: [
        { key: "left", label: "Links" },
        { key: "center", label: "Gecentreerd" },
        { key: "right", label: "Rechts" },
      ],
      value: "right",
    },
  },
};

// const productDescription = {
//   name: "productDescription" as const,
//   label: "Product beschrijving",
//   previewurl: "/images/block/productDescription.png",
//   fields: {
//     descriptionTitle: {
//       label: "Beschrijving - titel",
//       type: "string",
//       value: "Omschrijving",
//     },
//     descriptionVideoSrc: {
//       label: "Beschrijving - Video embed url",
//       type: "string",
//       value:
//         "https://www.youtube.com/embed/9HGWq9ugLAQ?controls=1&rel=0&playsinline=0&modestbranding=0&autoplay=0&enablejsapi=1&origin=https%3A%2F%2Fphysis.academy&widgetid=1",
//     },
//     descriptionDescription: {
//       label: "Beschrijving - body",
//       type: "text",
//       value: `Steeds meer behandelaars en trainers hebben het gevoel dat alléén trainen of behandelen niet tot het resultaat leidt wat mensen echt nodig hebben.
//       Veel van de problemen waar klanten mee komen, liggen niet alleen bij bewegen en voeding, maar komen vanuit problemen met slaap, stress, ademhaling en het functioneren van het immuunsysteem. Dit zal in de toekomst alleen maar meer voor gaan komen door onze hedendaagse levensstijl en de eisen vanuit de maatschappij.

//       Tijdens de 6 domeinen cursus leer je in 4 dagen enorm veel relaties en praktische tools. Cursisten zetten de kennis veel in om:
//       <ul>
//       <li>het energie niveau van klanten enorm te verhogen.</li>
//       <li>sneller resultaat te behalen bij klanten met Chronische Pijn.</li>
//       <li>mensen van hun slaapproblemen en darmklachten af te helpen.</li>
//       <li>ademhaling in te zetten bij bekkenbodemproblemen, hoofdpijn en nekpijn.</li>
//       <li>en nog veel meer!</li>
//       </ul>
//       `,
//     },
//     listTitle: {
//       label: "Informatie - titel",
//       type: "string",
//       value: "Praktische informatie",
//     },
//     listItems: {
//       label: "Informatie - lijst",
//       type: "list",
//       value: [
//         {
//           title:
//             "Wat zijn de toelatingseisen voor de opleidingen van Physis Academy?",
//           description:
//             "De Coach Opleiding is speciaal ontwikkeld voor behandelaars en trainers en is daarom ook alleen toegankelijk voor deze doelgroep. Het is daarentegen niet verplicht om éérst 1 van onze andere opleidingen te volgen. Benieuwd of deze cursus ook wat voor jou is? Neem dan contact met ons op via het contactformulier op de site.",
//         },
//         {
//           title:
//             "Wat zijn de toelatingseisen voor de opleidingen van Physis Academy?",
//           description:
//             "De Coach Opleiding is speciaal ontwikkeld voor behandelaars en trainers en is daarom ook alleen toegankelijk voor deze doelgroep. Het is daarentegen niet verplicht om éérst 1 van onze andere opleidingen te volgen. Benieuwd of deze cursus ook wat voor jou is? Neem dan contact met ons op via het contactformulier op de site.",
//         },
//         {
//           title:
//             "Wat zijn de toelatingseisen voor de opleidingen van Physis Academy?",
//           description:
//             "De Coach Opleiding is speciaal ontwikkeld voor behandelaars en trainers en is daarom ook alleen toegankelijk voor deze doelgroep. Het is daarentegen niet verplicht om éérst 1 van onze andere opleidingen te volgen. Benieuwd of deze cursus ook wat voor jou is? Neem dan contact met ons op via het contactformulier op de site.",
//         },
//       ],
//     },
//     teachersTitle: {
//       label: "Docenten - titel",
//       type: "string",
//       value: "Docenten",
//     },
//     teachersItems: {
//       label: "Docenten - lijst",
//       type: "teachers",
//       value: [],
//     },
//     reviewsTitle: {
//       label: "Reviews - titel",
//       type: "string",
//       value: "Reviews van cursisten",
//     },
//     buttons: {
//       label: "Knoppen",
//       type: "buttons",
//       value: [
//         {
//           title: "Download whitepaper",
//           href: "https://physis.academy/wp-content/uploads/2020/12/Whitepaper-Immuunsysteem.pdf",
//           target: "_blank",
//           variant: "outline",
//           size: "lg",
//         },
//         {
//           title: "Schrijf je nu in!",
//           href: "https://physis.academy/product/geen-categorie/de-6-domeinen-cursus/",
//           target: "_self",
//           variant: "success",
//           size: "lg",
//         },
//       ],
//     },
//   },
// };

const htmlBlocks = {
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
  // productDescription,
  contactForm,
  libraryPreview,
  coursesPreview,
  callToAction,
  contentImage,
};

export default htmlBlocks;
