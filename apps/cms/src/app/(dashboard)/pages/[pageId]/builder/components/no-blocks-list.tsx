import Image from "next/image";
import { Plus } from "lucide-react";
import { v4 as uuidv4 } from "uuid";

import { Block, blocks } from "~/lib/blocks";

export default function NoBlocksList({
  onSelect,
}: {
  onSelect: (block: Block) => void;
}) {
  return (
    <div className="bg-white">
      <div className="mx-auto w-full max-w-7xl px-6 pb-20 lg:px-8">
        <div className="mx-auto mt-20 max-w-2xl text-center sm:mt-24">
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            No blocks found
          </h1>
          <p className="mt-4 text-base leading-7 text-gray-600 sm:mt-6 sm:text-lg sm:leading-8">
            Start by adding your first block to this page. Quickstart by
            selecting one of the following template blocks or view all blocks in
            the menu below.
          </p>
        </div>
        <div className="mx-auto mt-16 flow-root max-w-lg sm:mt-20">
          <h2 className="sr-only">Popular pages</h2>
          <ul
            role="list"
            className="-mt-6 divide-y divide-gray-900/5 border-b border-gray-900/5"
          >
            {Object.entries(blocks).map(([name, item]) => (
              <li
                key={name}
                className="relative flex cursor-pointer gap-x-6 py-6"
                onClick={() =>
                  onSelect({
                    name,
                    fieldValues: item.defaultFieldValues,
                    id: uuidv4(),
                  } as Block)
                }
              >
                <div className="relative flex h-24 w-40 flex-none items-center justify-center overflow-hidden rounded-lg bg-gray-50 group-hover:bg-white">
                  <Image
                    src={item.previewurl}
                    fill
                    alt={item.label}
                    className="object-cover"
                  />
                </div>
                <div className="flex-auto">
                  <h3 className="text-sm font-semibold leading-6 text-gray-900">
                    <span className="absolute inset-0" aria-hidden="true" />
                    {item.label}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-gray-600">
                    {item.description}
                  </p>
                </div>
                <div className="flex-none self-center">
                  <Plus className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
