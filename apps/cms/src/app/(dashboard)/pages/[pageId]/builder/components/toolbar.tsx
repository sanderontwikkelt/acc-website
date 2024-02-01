"use client";

import React from "react";
import Link from "next/link";
import TooltipWrapper from "@/components/tooltip-wrapper";
import { Button, buttonVariants } from "@/components/ui/button";
import { BlockType } from "@/lib/html-blocks";
import { cn } from "@/lib/utils";
import { Page, SEO } from "@prisma/client";
import {
  ChevronLeft,
  Command,
  LucideIcon,
  MenuIcon,
  MonitorIcon,
  Option,
  Redo,
  SaveIcon,
  ArrowBigUp as Shift,
  Smartphone,
  TabletIcon,
  TimerReset,
  Undo,
} from "lucide-react";

import { PresetActions } from "./actions";
import PageSwitcher from "./page-switcher";

type Display = "desktop" | "tablet" | "mobile";

const IconButton = ({
  className,
  disabled,
  active,
  onClick,
  message,
  children,
  Icon,
}: {
  className?: string;
  Icon: LucideIcon;
  disabled?: boolean;
  active?: boolean;
  onClick: () => void;
  message: string;
  children: React.ReactNode;
}) => (
  <button
    disabled={disabled}
    className={cn(
      "w-6 rounded-md px-1 max-md:hidden",
      active ? "bg-background" : "",
      className,
      disabled ? "pointer-events-none opacity-60" : "",
    )}
    onClick={onClick}
  >
    <TooltipWrapper
      disabled={disabled}
      message={
        <div className="flex items-center space-x-2">
          {message}
          <code className="ml-2 flex h-5 items-center rounded-sm bg-secondary p-1 text-xs text-primary/80 text-opacity-60">
            {children}
          </code>
        </div>
      }
    >
      <Icon className="w-4" />
    </TooltipWrapper>
  </button>
);

const Toolbar = ({
  page,
  pages,
  blocks,
  seo,
  display,
  loading,
  reset,
  undo,
  redo,
  canUndo,
  canRedo,
  setDisplay,
  setShowMenu,
  publish,
}: {
  page: Page;
  pages: Page[];
  display: Display;
  reset: () => void;
  undo: () => void;
  redo: () => void;
  canUndo: boolean;
  canRedo: boolean;
  setDisplay: (d: Display) => void;
  blocks: BlockType[];
  seo: SEO;
  loading: boolean;
  publish: () => void;
  setShowMenu: (m: (m: boolean) => boolean) => void;
}) => {
  const handleKeyPress = (e: KeyboardEvent) => {
    if (e.ctrlKey || e.metaKey) {
      if (e.shiftKey && e.key === "r") {
        e.preventDefault();
        reset();
      } else if (e.key === "s") {
        e.preventDefault();
        publish();
      } else if (e.key === "z") {
        if (e.shiftKey) {
          redo();
        } else {
          undo();
        }
      }
    } else if (e.altKey) {
      if (e.key === "m") {
        setDisplay("mobile");
      } else if (e.key === "d") {
        setDisplay("desktop");
      } else if (e.key === "t") {
        setDisplay("tablet");
      }
    }
  };

  React.useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [redo, undo, reset, setDisplay]);

  return (
    <div className="flex h-[39px] min-h-[39px] w-full items-center border-b border-input bg-secondary px-5">
      {/* <div className='w-2 h-2 rounded-full bg-[#ff5f57] mr-[6px]' />
          <div className='w-2 h-2 rounded-full bg-[#febb2c] mr-[6px]' />
          <div className='w-2 h-2 rounded-full bg-[#2bc840] mr-auto' /> */}
      <button className="mr-2" onClick={() => setShowMenu((prev) => !prev)}>
        <MenuIcon className="w-4" />
      </button>
      <Link
        href={`/pages`}
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "mr-auto justify-start rounded-none px-0 text-xs",
        )}
      >
        <ChevronLeft className="inline h-4 w-4" />
        <span className="max-md:hidden">Terug naar Pagina&apos;s</span>
      </Link>
      <PageSwitcher pages={pages} page={page} mobile={display === "mobile"} />
      <div className="ml-auto flex items-center space-x-10">
        <div className="flex items-center space-x-2">
          <IconButton
            onClick={() => setDisplay("desktop")}
            active={display === "desktop"}
            message="Desktop weergave"
            Icon={MonitorIcon}
          >
            <Option className="mr-[6px] w-3" /> + D
          </IconButton>
          <IconButton
            onClick={() => setDisplay("tablet")}
            active={display === "tablet"}
            message="Tablet weergave"
            Icon={TabletIcon}
          >
            <Option className="mr-[6px] w-3" /> + T
          </IconButton>
          <IconButton
            onClick={() => setDisplay("mobile")}
            active={display === "mobile"}
            message="Mobiel weergave"
            Icon={Smartphone}
          >
            <Option className="mr-[6px] w-3" /> + M
          </IconButton>
        </div>
        <div className="flex items-center space-x-2">
          <IconButton
            onClick={() => undo()}
            disabled={!canUndo}
            message="Ongedaan maken"
            Icon={Undo}
          >
            <Command className="mr-[6px] w-3" /> + Z
          </IconButton>
          <IconButton
            onClick={() => redo()}
            disabled={!canRedo}
            message="Veranderingen wissen"
            Icon={Redo}
          >
            <Command className="mr-[6px] w-3" /> +{" "}
            <Shift className="ml-[6px] mr-[6px] w-3" /> + Z
          </IconButton>
          <IconButton onClick={() => reset()} message="Reset" Icon={TimerReset}>
            <Command className="mr-[6px] w-3" />
            <Shift className="ml-[6px] mr-[6px] w-3" /> + R
          </IconButton>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="default"
            className="h-7 px-2 py-2"
            onClick={publish}
            disabled={loading}
          >
            <SaveIcon className="w-4" />
          </Button>

          <PresetActions
            blocks={blocks}
            page={page}
            seo={seo}
            pageIds={pages.map(({ id }) => id)}
          />
        </div>
      </div>
    </div>
  );
};

export default Toolbar;
