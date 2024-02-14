"use client";

import { ReactNode, useCallback } from "react";
import Image from "next/image";
import { EditIcon, PlusIcon } from "lucide-react";
import { v4 as uuidv4 } from "uuid";

import { Page } from "@acme/db";
import { cn } from "@acme/ui";
import { toast } from "@acme/ui/toast";

import DragList from "~/components/ui/drag-list";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import htmlBlocks, { BlockType } from "~/lib/html-blocks";

const BlockNavigation = ({
  onClick,
  src,
  children,
  add,
}: {
  add?: boolean;
  onClick: () => void;
  src: string;
  children: ReactNode;
}) => (
  <button
    onClick={onClick}
    className="group relative flex w-full items-center rounded-lg bg-background p-3 hover:bg-secondary"
  >
    <div className="pointer-events-none absolute left-1/2 top-full z-50 h-52 w-72 -translate-x-1/2 -translate-y-4 scale-90 overflow-hidden rounded-md border border-input bg-[#FCF9EC] opacity-0 shadow-xl transition-all duration-300 group-hover:translate-y-0 group-hover:scale-100 group-hover:opacity-100">
      <Image
        src={src + "?234"}
        fill
        alt="preview"
        className="object-contain p-4"
      />
    </div>
    <div className="mr-3 flex flex-col items-start text-primary">
      <div className="text-left text-sm font-medium">
        {children}
        <span className="absolute inset-0" />
      </div>
    </div>
    {add ? (
      <PlusIcon className="ml-auto w-4" />
    ) : (
      <EditIcon className="ml-auto w-4" />
    )}
  </button>
);

export default function ComponentsMenu({
  onSelect,
  page,
  blocks: blocksState,
  open,
  setSectionId,
  setEditorOpen,
  setBlocks,
}: {
  page: Page;
  open: boolean;
  blocks: BlockType[];
  setEditorOpen: (e: "blocks" | "header" | "footer") => void;
  setBlocks: (b: BlockType[]) => void;
  setSectionId: (s: string) => void;
  onSelect: (block: BlockType) => void;
}) {
  const handleSectionId = useCallback(
    (id: string) => {
      setEditorOpen("blocks");
      setSectionId(id);
    },
    [setSectionId],
  );

  const dragItem = useCallback(
    ({ value }: { value: BlockType; index: number }) => {
      const item = htmlBlocks[value.name];
      return (
        <BlockNavigation
          key={value.name}
          src={item.previewurl}
          onClick={() => {
            handleSectionId(value.uid);
          }}
        >
          {item.label}
        </BlockNavigation>
      );
    },
    [blocksState],
  );

  return (
    <aside
      className={cn(
        "relative flex h-full w-[24rem] flex-col overflow-hidden bg-background pb-6 transition-all duration-300 max-md:fixed max-md:top-10 max-md:z-50 max-md:w-screen",
        open
          ? "min-w-[100vw] opacity-100 max-md:right-0 md:min-w-[24rem]"
          : "min-w-[0rem] opacity-0 max-md:right-full md:w-0",
      )}
    >
      <Tabs defaultValue="blocks" className="w-full py-5">
        <TabsList className="ml-5 grid grid-cols-2 max-md:mx-5">
          <TabsTrigger value="blocks">Pagina blocks</TabsTrigger>
          <TabsTrigger value="library">Blocks library</TabsTrigger>
        </TabsList>
        <TabsContent value="blocks">
          <div className="h-[calc(100vh-8.125rem)] max-h-[calc(100vh-8.125rem)] w-full min-w-[100vw] space-y-4 overflow-auto py-2 pl-5 max-md:px-5 md:min-w-[24rem]">
            <div className="rounded-md bg-accent p-1">
              <BlockNavigation
                onClick={() => {
                  setEditorOpen("header");
                }}
                src="/images/block/header.png"
              >
                Header
              </BlockNavigation>
            </div>

            {blocksState?.length ? (
              <DragList
                values={blocksState || []}
                small
                onChange={setBlocks}
                dragItem={dragItem}
              />
            ) : null}
            <div className="rounded-md bg-accent p-1">
              <BlockNavigation
                onClick={() => {
                  setEditorOpen("footer");
                }}
                src="/images/block/footer.png"
              >
                Footer
              </BlockNavigation>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="library">
          <div className="h-[calc(100vh-6.625rem)] max-h-[calc(100vh-6.625rem)] w-[24rem] overflow-auto py-2 pl-5 max-md:px-5">
            <div className="space-y-4">
              {Object.entries(htmlBlocks)
                .sort(([a], [b]) => a.localeCompare(b))
                .map(([name, item]) => (
                  <div className="rounded-md bg-accent p-1" key={name}>
                    <BlockNavigation
                      key={name}
                      src={item.previewurl}
                      add
                      onClick={() => {
                        toast.success(
                          `${item.label} toegevoegd aan ${page.name}`,
                        );
                        onSelect({
                          ...item,
                          uid: uuidv4(),
                          id: uuidv4(),
                        } as any);
                      }}
                    >
                      {item.label}
                    </BlockNavigation>
                  </div>
                ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </aside>
  );
}
