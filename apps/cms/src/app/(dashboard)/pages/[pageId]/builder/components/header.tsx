"use client";

import { Fragment } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Popover, Transition } from "@headlessui/react";
import { ChevronLeft, Plus } from "lucide-react";
import { v4 as uuidv4 } from "uuid";

import { Page, PageBackup, SEO } from "@acme/db";
import { cn } from "@acme/ui";
import { toast } from "@acme/ui/toast";

import { buttonVariants } from "~/components/ui/button";
import htmlBlocks, { BlockType } from "~/lib/html-blocks";
import { PresetActions } from "./actions";
import PageBackupSwitcher from "./block-backup-switcher";
import PageSwitcher from "./page-switcher";

export default function Header({
  pages,
  onSelect,
  page,
  seo,
  backups,
  blocks: blocksState,
  setBlocks,
}: {
  pages: Page[];
  page: Page;
  seo: SEO;
  backups: PageBackup[];
  blocks: BlockType[];
  setBlocks: (blocks: BlockType[]) => void;
  onSelect: (block: BlockType) => void;
}) {
  const params = useParams();
  return (
    <header className="fixed bottom-5 left-1/2 z-[9999999] flex -translate-x-1/2 items-center justify-between rounded-full border border-gray-400 bg-black text-white">
      <Link
        href={`/pages/${params.pageId as string}`}
        className={cn(
          buttonVariants({ variant: "ghostDark" }),
          "rounded-l-full pl-3 pr-2",
        )}
      >
        <ChevronLeft className="h-4 w-4" />
      </Link>
      <PageSwitcher pages={pages} page={page} mobile />
      <PageBackupSwitcher setBlocks={setBlocks} backups={backups} />

      <Popover className="relative">
        <Popover.Button
          className={cn(
            buttonVariants({ variant: "ghostDark" }),
            "px-2 text-xs font-medium",
          )}
          style={{ boxShadow: "none" }}
        >
          <Plus className="h-4 w-4" aria-hidden="true" />
        </Popover.Button>

        <Transition
          as={Fragment}
          enter="transition ease-out duration-200"
          enterFrom="opacity-0 translate-y-1"
          enterTo="opacity-100 translate-y-0"
          leave="transition ease-in duration-150"
          leaveFrom="opacity-100 translate-y-0"
          leaveTo="opacity-0 translate-y-1"
        >
          <Popover.Panel className="fixed bottom-[calc(100%+0.5rem)] left-1/2 z-10 mt-5 flex w-screen max-w-max -translate-x-1/2 px-4">
            <div className="max-h-[80vh] w-screen max-w-[80vw] flex-auto overflow-auto rounded-3xl bg-white text-sm leading-6 shadow-lg ring-1 ring-gray-900/5 lg:max-w-[90vw]">
              <div className="grid grid-cols-1 gap-x-6 gap-y-1 p-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {Object.entries(htmlBlocks).map(([name, item]) => (
                  <button
                    key={name}
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
                    className="group relative flex items-center gap-x-6 rounded-lg p-4 hover:bg-gray-50"
                  >
                    <div className="relative flex h-20 w-32 flex-none items-center justify-center overflow-hidden rounded-lg bg-gray-50 group-hover:bg-white">
                      <Image
                        src={item.previewurl}
                        fill
                        alt={name}
                        className="object-cover"
                      />
                    </div>
                    <div className="flex flex-col items-start">
                      <div className="text-md text-left font-semibold text-gray-900">
                        {item.label}
                        <span className="absolute inset-0" />
                      </div>
                      <p className="mt-1 text-left text-gray-600">
                        {Object.keys(item.fields).length} velden.
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </Popover.Panel>
        </Transition>
      </Popover>

      <PresetActions
        blocks={blocksState}
        page={page}
        seo={seo}
        pageIds={pages.map(({ id }) => id)}
      />
    </header>
  );
}
