"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { ChevronLeft } from "lucide-react";

import { cn } from "~/lib/utils";

const SidebarSwitch = () => {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const handleOpen = () => {
    const sidebar = document.getElementById("sidebar");
    if (sidebar) {
      if (open) {
        sidebar.style.transform = "translateX(-100%)";
        setOpen(false);
      } else {
        sidebar.style.transform = "translateX(0%)";
        setOpen(true);
      }
    }
  };

  useEffect(() => {
    const sidebar = document.getElementById("sidebar");
    if (sidebar) {
      if (window.innerWidth < 800) {
        setOpen(false);
        sidebar.style.transform = "translateX(-100%)";
      }
    }
  }, [pathname]);
  return (
    <button
      onClick={handleOpen}
      className={cn(
        "fixed top-[calc(100vh-3.75rem)] flex h-10 w-10 items-center justify-center rounded-full border border-input bg-background transition-all duration-300 md:hidden",
        open ? "right-5 rotate-0" : "-right-[3.5rem] rotate-180",
      )}
    >
      <ChevronLeft />
    </button>
  );
};

export default SidebarSwitch;
