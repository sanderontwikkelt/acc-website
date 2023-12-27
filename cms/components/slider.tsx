import { ReactNode, useState } from "react"
import { TrashIcon, XMarkIcon } from "@heroicons/react/24/outline"

import { cn } from "@/lib/utils"

import { AlertModal } from "./modals/alert-modal"

export default function Slider({
  open,
  title,
  setOpen,
  children,
  onDelete,
}: {
  open: boolean
  title: string
  onDelete?: () => void
  children: ReactNode
  setOpen: (b: boolean) => void
}) {
  const [openAlert, setOpenAlert] = useState(false)
  return (
    <>
      <aside
        className={cn(
          "relative flex h-full flex-col overflow-hidden bg-background pb-6 transition-all duration-300 max-md:fixed max-md:top-10 max-md:z-50 max-md:w-screen",
          open
            ? "min-w-[100%] max-w-[100%] opacity-100 max-md:left-0 md:min-w-[24rem] md:max-w-[24rem]"
            : "min-w-[0rem] max-w-[0] opacity-0 max-md:left-full"
        )}
      >
        <div className="w-full min-w-[100vw] md:min-w-[24rem]">
          <div className="sticky top-0 z-10 mr-5 mt-3 flex h-10 w-[calc(100%-1.25rem)] items-center border-b border-input bg-background max-md:mx-5 max-md:w-[calc(100%-2.5rem)]">
            <div className="flex w-full items-center justify-between">
              <h2 className="text-base font-semibold leading-6 text-primary">
                {title} bewerken
              </h2>
              <div className="ml-3 flex h-7 items-center">
                {!!onDelete && (
                  <button
                    type="button"
                    className="relative mr-3 rounded-md text-primary hover:text-primary/80 "
                    onClick={() => setOpenAlert(open)}
                  >
                    <TrashIcon className="h-4 w-4" aria-hidden="true" />
                  </button>
                )}
                <button
                  type="button"
                  className="relative rounded-md text-primary hover:text-primary/80 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                  onClick={() => setOpen(false)}
                >
                  <span className="absolute -inset-2.5" />
                  <span className="sr-only">Close panel</span>
                  <XMarkIcon className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
          <div className="relative flex-1">{children}</div>
        </div>
      </aside>
      <AlertModal
        isOpen={openAlert}
        onClose={() => setOpenAlert(false)}
        onConfirm={() => {
          onDelete?.()
          setOpenAlert(false)
          setOpen(false)
        }}
        loading={false}
      />
    </>
  )
}
