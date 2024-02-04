/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const Image = ({ src, ...props }) => {
  return (
    <img
      src={src}
      {...props}
      alt=""
      className="h-full w-full rounded-md bg-gray-100 object-contain"
      style={{
        ...props.style,
        WebkitTouchCallout: "none",
        WebkitUserSelect: "none",
      }}
    />
  );
};

export function SortableItem(props) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: props.id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  return (
    <div
      style={{ touchAction: "none", ...style }}
      className="aspect-square overflow-hidden rounded-md"
      ref={setNodeRef}
      {...attributes}
      {...listeners}
    >
      <Image
        src={props.value}
        style={{
          opacity: props.dragged ? 0.7 : 1,
        }}
      />
    </div>
  );
}
