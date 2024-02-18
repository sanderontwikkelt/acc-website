import { db, schema } from "@acme/db";

import Client from "./components/client";
import Server from "./components/server";

export async function generateStaticParams() {
  const pages = await db
    .select({
      id: schema.page.id,
      pathname: schema.page.pathname,
    })
    .from(schema.page);
  return pages.map(({ pathname }: { pathname: string }) => ({
    pathname: [pathname.replace("/", "")],
  }));
}

export default async function DynamicPage({
  params,
  searchParams,
}: {
  params: { pathname: string[] };
  searchParams?: Record<string, string | string[] | undefined>;
}) {
  const pathname = params.pathname?.join("/") || "";

  const builder = searchParams?.mode === "builder";
  return builder ? <Client /> : <Server pathname={pathname} />;
}
