"use client";

import Slider from "@/components/slider";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import DynamicLinks from "@/components/ui/dynamic-links";
import DynamicNavs from "@/components/ui/dynamic-navs";
import { Label } from "@/components/ui/label";
import RichInput from "@/components/ui/rich-input";
import { getArray } from "@/lib/getArray";
import { Footer, Page } from "@prisma/client";

import { State } from "./client";

const FooterAsideEditor = ({
  open,
  setOpen,
  footer,
  setState,
  pages,
  state,
}: {
  pages: Page[];
  open: boolean;
  setOpen: (b: boolean) => void;
  footer: Footer;
  state: State;
  setState: (b: State) => void;
}) => {
  const navigation = getArray(footer.navigation) as {
    pathname: string;
    name: string;
  }[];
  const links = getArray(footer.links) as {
    pathname: string;
    name: string;
  }[];
  const informationLinks = getArray(footer.informationLinks) as {
    pathname: string;
    name: string;
  }[];
  const socials = getArray(footer.socials) as {
    title: string;
    href: string;
  }[];
  return (
    <Slider title="Footer" open={open} setOpen={setOpen}>
      <div className="max-h-[calc(100vh-6.375rem)] space-y-8 overflow-auto py-4 pl-1 pr-5 max-md:px-5">
        <Alert>
          <AlertTitle className="flex items-center gap-x-2">
            Pas op:
            <Badge variant="destructive">Globale instellingen</Badge>
          </AlertTitle>
          <AlertDescription className="mt-4 flex items-center justify-between">
            <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-xs">
              Footer instellingen aanpassen gelden voor elke pagina
            </code>
          </AlertDescription>
        </Alert>
        <div className="space-y-2">
          <Label>Titel</Label>
          <RichInput
            value={footer.title || ""}
            id="input-footer"
            onChange={(title) =>
              setState({
                ...state,
                footer: { ...(state.footer || footer), title },
              })
            }
          />
        </div>
        <div className="space-y-2">
          <Label>Navigatie</Label>
          <DynamicNavs
            values={navigation?.length ? navigation : []}
            items={pages}
            onChange={(v) =>
              setState({
                ...state,
                footer: { ...(state.footer || footer), navigation: v },
              })
            }
          />
        </div>
        <div className="space-y-2">
          <Label>Links</Label>
          <DynamicNavs
            values={links?.length ? links : []}
            items={pages}
            onChange={(v) =>
              setState({
                ...state,
                footer: { ...(state.footer || footer), links: v },
              })
            }
          />
        </div>
        <div className="space-y-2">
          <Label>Informatie links</Label>
          <DynamicNavs
            values={informationLinks?.length ? informationLinks : []}
            items={pages}
            onChange={(v) =>
              setState({
                ...state,
                footer: { ...(state.footer || footer), informationLinks: v },
              })
            }
          />
        </div>
        <div className="space-y-2">
          <Label>Socials</Label>
          <DynamicLinks
            values={socials?.length ? socials : []}
            onChange={(v) => {
              setState({
                ...state,
                footer: { ...(state.footer || footer), socials: v },
              });
            }}
          />
        </div>
      </div>
    </Slider>
  );
};

export default FooterAsideEditor;
