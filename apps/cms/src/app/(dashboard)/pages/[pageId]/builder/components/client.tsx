/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import useUndo from "use-undo";

import type { Footer, Header, Page } from "@acme/db";
import { toast } from "@acme/ui/toast";

import type { BlockType } from "~/lib/html-blocks";
import { Loader } from "~/components/ui/loader";
import htmlBlocks from "~/lib/html-blocks";
import { revalidateClientTag } from "~/lib/revalidate-client-tag";
import { api } from "~/trpc/react";
import AsideEditor from "./aside-editor";
import ComponentsMenu from "./components-menu";
import FooterAsideEditor from "./footer-aside-editor";
import HeaderAsideEditor from "./header-aside-editor";
import Toolbar from "./toolbar";
import Website from "./website";

export interface State {
  blocks: BlockType[];
  header: Header | null;
  footer: Footer | null;
}

const PageEditorClient = ({
  pages,
  page,
  header,
  footer,
}: {
  pages: Page[];
  page: Page;
  header: Header;
  footer: Footer;
}) => {
  const init = {
    blocks: Array.isArray(page?.blocks) ? (page?.blocks as any) : [],
  } as State;
  const [sectionId, setSectionId] = useState<string | null>(null);
  const [isIframeReady, setIframeReady] = useState<boolean>(false);
  const [sent, setSent] = useState<boolean>(false);
  const [editorOpen, setEditorOpen] = useState<
    "header" | "blocks" | "footer" | null
  >(null);
  const [showMenu, setShowMenu] = useState<boolean>(true);
  const [loading, setLoading] = useState(false);
  const [display, setDisplay] = useState<"desktop" | "tablet" | "mobile">(
    "desktop",
  );
  const [pageState, { set: setState, reset, ...undoActions }] = useUndo(init);
  const { present: state } = pageState;
  const setBlocks = (blocks: BlockType[]) => {
    setState({ ...state, blocks });
  };

  const setHeaderState = (header: Header) => {
    setState({ ...state, header });
  };

  const frontendUrl = process.env.NEXT_PUBLIC_FRONT_URL;
  const router = useRouter();

  const postMessageToIframe = () => {
    const iframe = document.getElementById(
      "website-iframe",
    ) as HTMLIFrameElement;

    iframe?.contentWindow?.postMessage(
      {
        header: state.header || header,
        footer: state.footer || footer,
        blocks: state.blocks.map(
          ({ uid, id, fields, name, style, innerStyle, maxWidth, label }) => ({
            label,
            id,
            uid,
            innerStyle,
            maxWidth,
            fields: Object.entries(fields).reduce(
              (acc, [key, { value }]) => ({ ...acc, [key]: value }),
              {} as any,
            ),
            name,
            style,
          }),
        ),
      },
      frontendUrl,
    );
    setSent(true);
  };

  useEffect(() => {
    const iframe = document.getElementById(
      "website-iframe",
    ) as HTMLIFrameElement;
    // If the iframe is already ready, post the message immediately
    if (isIframeReady) {
      setTimeout(
        () => {
          postMessageToIframe();
        },
        sent ? 0 : 2000,
      );
    } else {
      // If not, set up a load event listener on the iframe

      // Handler for load event
      const handleLoad = () => {
        setIframeReady(true);
        postMessageToIframe();
      };
      // Add load event listener
      iframe?.addEventListener("load", handleLoad);

      // Return a cleanup function to remove the event listener
      return () => {
        iframe?.removeEventListener("load", handleLoad);
      };
    }
    setSent(true);
  }, [state, isIframeReady, frontendUrl]);

  useEffect(() => {
    const sidebar = document.getElementById("sidebar");
    if (sidebar) sidebar.style.display = "none";
    return () => {
      if (sidebar) sidebar.style.display = "flex";
    };
  }, []);

  const moveSection = useCallback(
    (sectionId: string, direction: "UP" | "DOWN") => {
      const arr = state.blocks;
      const index = state.blocks.findIndex(({ uid }) => sectionId === uid);
      if (index || direction === "DOWN") {
        const swapIndex = index + (direction === "UP" ? -1 : 1);
        const temp = arr[index];
        arr[index] = arr[swapIndex];
        arr[swapIndex] = temp;
      }
      setState({ ...state, blocks: [...arr] });
    },
    [state, setState],
  );

  const block = useMemo(() => {
    if (!sectionId) return null;
    const stateBlock = state.blocks.find(({ uid, id }) =>
      [uid, id].includes(sectionId),
    );
    if (!stateBlock) return null;
    const htmlBlock = htmlBlocks[stateBlock.name];
    if (!htmlBlock) return null;
    return {
      ...stateBlock,
      fields: Object.entries(htmlBlock.fields).reduce(
        (a, [key, fieldValues]) => ({
          ...a,
          [key]: {
            ...fieldValues,
            value:
              (stateBlock.fields as any)?.[key]?.value === undefined
                ? fieldValues.value
                : (stateBlock.fields as any)?.[key]?.value,
          },
        }),
        {},
      ),
    };
  }, [state.blocks, sectionId]);

  const handleSectionId = useCallback(
    (id: string | null) => {
      setEditorOpen("blocks");
      setSectionId(id);
    },
    [setSectionId],
  );

  const updatePage = api.page.updateBlocks.useMutation();
  const updateHeader = api.header.update.useMutation();
  const updateFooter = api.footer.update.useMutation();

  const publish = async () => {
    try {
      setLoading(true);
      await updatePage.mutateAsync({
        blocks: JSON.stringify(state.blocks),
        id: page.id,
      });
      await revalidateClientTag(`page${page.id}`);
      if (state.header) {
        await updateHeader.mutateAsync(state.header as any);
        await revalidateClientTag("header");
      }
      if (state.footer) {
        await updateFooter.mutateAsync(state.footer as any);
        await revalidateClientTag("footer");
      }
      router.refresh();
      toast.success("Opgeslagen en gepubliseerd.");
    } catch (error: any) {
      console.log(error);
      toast.error("Er is iets mis gegaan.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-full w-full flex-col">
      <Toolbar
        display={display}
        blocks={state.blocks}
        setDisplay={setDisplay}
        publish={publish}
        loading={loading}
        setShowMenu={setShowMenu}
        page={page}
        pages={pages}
        {...undoActions}
        reset={() => reset(init)}
      />
      <div className="flex h-[calc(100%-2.5rem)] w-full">
        {!!page && (
          <ComponentsMenu
            page={page}
            open={!editorOpen && showMenu}
            setBlocks={setBlocks}
            setSectionId={setSectionId}
            setEditorOpen={setEditorOpen}
            onSelect={(newBlock) =>
              setState({ ...state, blocks: [...state.blocks, newBlock] })
            }
            blocks={state.blocks}
          />
        )}

        {!!page && (
          <Website
            page={page}
            display={display}
            moveSection={moveSection}
            setSectionId={handleSectionId}
            onNavigate={(pathname: string) => {
              const selectedPage = pages.find((p) => p.pathname === pathname);
              if (selectedPage)
                router.push(`/pages/${selectedPage.id}/builder`);
            }}
          />
        )}
        {!sent && (
          <div className="fixed inset-0 z-50 flex h-full w-full items-center justify-center bg-background">
            <Loader />
          </div>
        )}

        <AsideEditor
          open={showMenu && editorOpen === "blocks"}
          setBlock={(newBlock) => {
            setBlocks(
              newBlock
                ? state.blocks.map((oldBlock) =>
                    sectionId === oldBlock.uid ? newBlock : oldBlock,
                  )
                : state.blocks.filter((b) => b.uid !== sectionId),
            );
          }}
          setOpen={() => setEditorOpen(null)}
          block={block as BlockType}
        />
        <HeaderAsideEditor
          pages={pages}
          open={showMenu && editorOpen === "header"}
          setOpen={() => setEditorOpen(null)}
          header={state.header || header}
          setHeader={setHeaderState}
        />
        <FooterAsideEditor
          pages={pages}
          open={showMenu && editorOpen === "footer"}
          setOpen={() => setEditorOpen(null)}
          footer={state.footer || footer}
          state={state}
          setState={setState}
        />
      </div>
    </div>
  );
};

export default PageEditorClient;
