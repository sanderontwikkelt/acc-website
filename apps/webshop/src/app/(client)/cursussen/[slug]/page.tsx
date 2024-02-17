import { WEB_URL } from "~/lib/constants";
import { metadata } from "../../../layout";
import { Course, Media, Teacher, db, schema } from "@acme/db";
import { notFound } from "next/navigation";
import CourseDetails from "~/components/course";
import type { Button as ButtonType } from "~/lib/types";
import ServerWrapper from "~/components/server-wrapper";
import Section from "~/components/section";
import Accordion from "~/components/blocks/accordion";
import Hero from "~/components/blocks/hero";
import Heading from "~/components/blocks/heading";

interface ListItem {title: string; description: string}

async function getCourse(id: string) {
  const tags = ["course/" + id];
  const url = `${WEB_URL}/api/courses?slug=${id}`;
  try {
    const res = await fetch(url, {
      next: { tags, revalidate: 0 },
    });

    if (!res.ok) {
      throw new Error("Failed to fetch");
    }

    return res.json() as Promise<Course & { media: Media, teachers: {teacher:Teacher & { media: Media}}[] }>;
  } catch (e) {
    console.log({ e, url });
  }
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const {slug} = params;
  const course = await getCourse(slug);
  if (!course) return metadata;

  const title = course.seoTitle || course.title
  const description = course.seoDescription || course.description

  return {
    metadataBase: new URL(WEB_URL),
    title,
    description,
    alternates: {
      canonical: `/cursussen/${slug}`,
    },
    manifest: "/manifest.webmanifest",
    openGraph: {
      title,
      description,
      url: `${WEB_URL}/${slug}`,
      siteName: "Physis",
      ...(course.media && { images: [course.media.url] }),
      locale: "nl_NL",
      type: "website",
    },
  };
}

export async function generateStaticParams() {
  const courses = await db
    .select({
      id: schema.course.id,
      slug: schema.course.slug,
    })
    .from(schema.course);
  return courses.map(({ slug }: { slug: string }) => ({
    pathname: ["cursussen", slug],
    slug,
  }));
}

export default async function DynamicPage({
  params,
}: {
  params: { slug: string };
}) {
  const course = await getCourse(params.slug);
  if (!course?.id) return notFound();

return <ServerWrapper>
  <Section id="course-hero" className="bg-accent">
    <Hero
    title={course.title}
    description={course.description}
    image={{...course.media, src: course.media.url}}
    variant='blog'
    breadcrumbs={[
      { title: 'Home', href: '/' },
      { title: course.title, href: '#', active: true },
    ]}
    />
    </Section>
  <Section id="course-details">

  <CourseDetails
  description={course.body as string}
  videoLink={course.videoLink}
  infoItems={course.infoItems as ListItem[]}
  teachers={course.teachers?.map(({teacher}) => ({ ...teacher, image: teacher.media})) || []}
  buttons={course.buttons as ButtonType[]}
  />
  </Section>
 {!!(course.faqItems as ListItem[])?.length && <Section id="faq">
  <Accordion title="Frequently Asked Questions" description="" list={course.faqItems as ListItem[]} />
  </Section>}
 {!!course.ctaTitle && <Section id="cta" className="bg-accent">
  <Heading button={course.ctaButton as ButtonType} as='h2' headingTextAlign="center" buttonAlign="center">{course.ctaTitle}</Heading>
  </Section>}
  </ServerWrapper>;
}
