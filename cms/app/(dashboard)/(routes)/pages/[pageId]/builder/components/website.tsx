"use client"

import React, { useEffect } from "react"
import { Page } from "@prisma/client"

const Website = ({
  page,
  display,
  setSectionId,
  moveSection,
  onNavigate,
}: {
  page: Page
  display: "desktop" | "tablet" | "mobile"
  moveSection: (sectionId: string, direction: "UP" | "DOWN") => void
  setSectionId: (s: string | null) => void
  onNavigate: (s: string) => void
}) => {
  const frontendUrl = process.env.NEXT_PUBLIC_FRONT_URL

  const getMessage = (event: any) => {
    if (event.origin === frontendUrl) {
      if (event.data.action === "EDIT") {
        setSectionId(event.data.id)
      } else if (event.data.action === "PATH") {
        onNavigate(event.data.pathname)
      } else {
        moveSection(event.data.id, event.data.action)
      }
    }
  }
  useEffect(() => {
    window.addEventListener("message", getMessage)

    return () => {
      window.removeEventListener("message", getMessage)
    }
  }, [])

  const { width, height, maxHeight, borderRadius } = {
    desktop: {
      width: "100%",
      height: "100%",
      maxHeight: "100vh",
      borderRadius: "8px",
    },
    tablet: {
      width: "768px",
      height: "1024px",
      maxHeight: "100%",
      borderRadius: "6px",
    },
    mobile: {
      width: "360px",
      height: "800px",
      maxHeight: "100%",
      borderRadius: "4px",
    },
  }[display]

  return (
    <div className="relative flex h-full flex-grow items-center justify-center bg-background px-4 py-5">
      <div
        className="overflow-hidden border border-input bg-secondary shadow-lg"
        style={{ width, height, maxHeight, borderRadius }}
      >
        <iframe
          id="website-iframe"
          src={frontendUrl + page.pathname + "?mode=builder"}
          frameBorder="0"
          className="h-full w-full flex-grow"
        />
      </div>
    </div>
  )
}

export default Website
