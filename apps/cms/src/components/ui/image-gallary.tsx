/* eslint-disable @typescript-eslint/no-explicit-any */
import type { DropAnimation } from "@dnd-kit/core";
import React, { useEffect, useState } from "react";
import {
  closestCenter,
  defaultDropAnimationSideEffects,
  DndContext,
  DragOverlay,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  rectSortingStrategy,
  SortableContext,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";
import { createPortal } from "react-dom";

import type { Media } from "@acme/db";

import { SortableItem } from "./sortable-item";

const defaultInitializer = (index: number) => index;

export function createRange<T = number>(
  length: number,
  initializer: (index: number) => any = defaultInitializer,
): T[] {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return [...new Array(length)].map((_, index) => initializer(index));
}

const dropAnimation: DropAnimation = {
  sideEffects: defaultDropAnimationSideEffects({
    styles: {
      active: {
        opacity: "0.5",
      },
    },
  }),
};

export function ImageGallary({
  selected,
  onChange,
}: {
  selected: Media[];
  onChange: (s: Media[]) => void;
}) {
  const [activeId, setActiveId] = useState<number | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        delay: 100,
        tolerance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  function handleDragEnd(event) {
    const { active, over } = event;

    if (active.id !== over.id) {
      const oldIndex = selected.findIndex((item) => item.id === active.id);
      const newIndex = selected.findIndex((item) => item.id === over.id);

      onChange(arrayMove(selected, oldIndex, newIndex));
    }

    setActiveId(null);
  }

  const getActiveValue = () => {
    const res = selected.find((item) => item.id === activeId);
    return res?.url;
  };

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={({ active }) => {
          if (!active) {
            return;
          }

          setActiveId(+active.id);
        }}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={selected} strategy={rectSortingStrategy}>
          <div className="grid grid-cols-3 gap-5 overflow-hidden">
            {selected.map(({ id, url }) => (
              <SortableItem
                dragged={id === activeId}
                key={id}
                id={id}
                value={url}
              />
            ))}
          </div>
        </SortableContext>
        {createPortal(
          <DragOverlay adjustScale={true} dropAnimation={dropAnimation}>
            {activeId ? (
              <SortableItem id={activeId} value={getActiveValue()} />
            ) : null}
          </DragOverlay>,
          document.body,
        )}
      </DndContext>
    </>
  );
}
