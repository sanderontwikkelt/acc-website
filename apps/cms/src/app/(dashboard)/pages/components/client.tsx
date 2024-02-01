"use client";

import { useRouter } from "next/navigation";
import { ApiList } from "@/components/ui/api-list";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { useHasPermissions } from "@/lib/utils";
import { ActionEnum, EntityEnum } from "@/types/permissions";
import { Plus } from "lucide-react";

import { columns, PageColumn } from "./columns";

interface PagesClientProps {
  data: PageColumn[];
}

export const PagesClient: React.FC<PagesClientProps> = ({ data }) => {
  const router = useRouter();
  const [canCreate] = useHasPermissions([EntityEnum.PAGE, ActionEnum.CREATE]);

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Pagina's (${data.length})`}
          description="Beheer pagina's"
        >
          {canCreate && (
            <Button onClick={() => router.push(`/pages/new`)}>
              <Plus className="mr-2 h-4 w-4" /> Toevoegen
            </Button>
          )}
        </Heading>
      </div>
      <Separator />
      <DataTable searchKey="name" columns={columns} data={data} />
    </>
  );
};
