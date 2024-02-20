"use client";

import type { Header, Page } from "@acme/db";

import Slider from "~/components/slider";
import { Alert, AlertDescription, AlertTitle } from "~/components/ui/alert";
import { Badge } from "~/components/ui/badge";
import DynamicNavs from "~/components/ui/dynamic-navs";
import { Label } from "~/components/ui/label";
import { getArray } from "~/lib/getArray";

interface Item {
  pathname: string;
  name: string;
  values: Item[];
}

const HeaderAsideEditor = ({
  open,
  setOpen,
  header,
  setHeader,
  pages,
}: {
  pages: Page[];
  open: boolean;
  setOpen: (b: boolean) => void;
  header: Header;
  setHeader: (b: Header) => void;
}) => {
  const navigation = getArray(header.navigation) as Item[];
  const links = getArray(header.links) as Item[];
  return (
    <Slider title="Header" open={open} setOpen={setOpen}>
      <div className="max-h-[calc(100vh-5rem)] space-y-8 overflow-auto py-4 pl-1 pr-5 max-md:px-5">
        <Alert>
          <AlertTitle className="flex items-center gap-x-2">
            Pas op:
            <Badge variant="destructive">Globale instellingen</Badge>
          </AlertTitle>
          <AlertDescription className="mt-4 flex items-center justify-between">
            <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-xs">
              Header instellingen aanpassen gelden voor elke pagina
            </code>
          </AlertDescription>
        </Alert>
        <div className="space-y-2">
          <Label>Navigatie</Label>
          <DynamicNavs
            values={navigation?.length ? navigation : []}
            items={pages.filter(({ concept }) => !concept)}
            onChange={(navigation) => setHeader({ ...header, navigation })}
            root
          />
        </div>
        <div className="space-y-2">
          <Label>Links</Label>
          <DynamicNavs
            values={links?.length ? links : []}
            items={pages.filter(({ concept }) => !concept)}
            onChange={(links) => setHeader({ ...header, links })}
          />
        </div>
      </div>
    </Slider>
  );
};

export default HeaderAsideEditor;
