import prismadb from "@/lib/prismadb";
import { format } from "date-fns";

import { PagesClient } from "./components/client";
import { PageColumn } from "./components/columns";

const PagesPage = async () => {
  const pages = await prismadb.page.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedPages: PageColumn[] = pages.map((item) => ({
    id: item.id,
    name: item.name,
    pathname: item.pathname,
    concept: item.concept ? "Ja" : "Nee",
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
        <PagesClient data={formattedPages} />
      </div>
    </div>
  );
};

export default PagesPage;
