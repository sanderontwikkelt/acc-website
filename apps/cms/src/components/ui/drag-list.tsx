/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ReactNode } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { DragHandleDots2Icon } from "@radix-ui/react-icons";
import { CopyIcon, PlusIcon } from "lucide-react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { v4 as uuidv4 } from "uuid";

import { cn } from "@acme/ui";

import TooltipWrapper from "../tooltip-wrapper";

type Value = Record<string, any>;

interface Props {
  onChange: (value: Value[]) => void;
  values: Value[];
  dragItem: (
    {
      key,
      value,
    }: {
      key: string;
      value: any;
      index: number;
    },
    i: number,
  ) => ReactNode;
  disabled?: boolean;
  root?: boolean;
  small?: boolean;
  className?: string;
}

const DragList = ({
  values,
  onChange,
  dragItem,
  disabled,
  className = "",
  root = false,
  small = false,
}: Props) => {
  const handleDrop = (droppedItem: any) => {
    if (!droppedItem.destination) return;
    const updatedList = [...values];
    const [reorderedItem] = updatedList.splice(
      droppedItem.source.index as number,
      1,
    );
    updatedList.splice(
      droppedItem.destination.index as number,
      0,
      reorderedItem,
    );
    onChange(updatedList);
  };
  return (
    <div className="relative">
      {root && (
        <div className="absolute -top-8 right-0 flex space-x-1 p-1">
          {!!values?.length && (
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                onChange(undefined);
              }}
            >
              <TooltipWrapper message="Toevoegen">
                <XMarkIcon className="h-5 w-5" />
              </TooltipWrapper>
            </button>
          )}
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              onChange([...values, { ...values[0], id: uuidv4() }]);
            }}
          >
            <TooltipWrapper message="Toevoegen">
              <PlusIcon className="h-5 w-5" />
            </TooltipWrapper>
          </button>
        </div>
      )}
      {values?.length ? (
        values?.length > 1 ? (
          <DragDropContext onDragEnd={handleDrop}>
            <Droppable droppableId="list-container">
              {(provided) => (
                <div
                  className={cn(
                    "list-container mb-4 space-y-1 rounded-md bg-accent p-1",
                    disabled ? "pointer-events-none" : "",
                    className,
                  )}
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {values.map((item, index) => {
                    if (!item) return;
                    if (!item.id) item.id = uuidv4();
                    return (
                      <Draggable
                        key={item.id + index}
                        draggableId={String(item.id)}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            className="item-container"
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                          >
                            <div
                              className={cn(
                                "card flex w-full flex-col items-start space-y-3 rounded-md border bg-background p-2 shadow-sm hover:shadow-md",
                              )}
                            >
                              <div className="flex w-full items-center">
                                <div {...provided.dragHandleProps}>
                                  <DragHandleDots2Icon className="h-6 w-auto rotate-90" />
                                </div>
                                {!!small && (
                                  <div className="w-full px-1">
                                    {dragItem(
                                      {
                                        key: item.name || item.id,
                                        value: item,
                                        index,
                                      },
                                      index,
                                    )}
                                  </div>
                                )}
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    onChange([
                                      ...values,
                                      { ...item, id: uuidv4(), uid: uuidv4() },
                                    ]);
                                  }}
                                  className="ml-auto"
                                >
                                  <TooltipWrapper message="Dupliceren">
                                    <CopyIcon className="h-4 w-4" />
                                  </TooltipWrapper>
                                </button>

                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    onChange(
                                      values.filter((_, idx) => idx !== index),
                                    );
                                  }}
                                  className="ml-[0.75rem]"
                                >
                                  <TooltipWrapper message="Verwijderen">
                                    <XMarkIcon className="h-6 w-6" />
                                  </TooltipWrapper>
                                </button>
                              </div>
                              {!small && (
                                <div className="flex w-full items-center">
                                  {dragItem(
                                    {
                                      key: item.name || item.id,
                                      value: item,
                                      index,
                                    },
                                    index,
                                  )}
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                      </Draggable>
                    );
                  })}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        ) : (
          <div className="mb-2">
            <div
              className={cn(
                "card flex w-full items-center rounded-md border border-input bg-background p-2 shadow-sm",
              )}
            >
              {!!values[0] &&
                dragItem(
                  {
                    key: values[0].name || values[0].id,
                    value: values[0],
                    index: 0,
                  },
                  0,
                )}
            </div>
          </div>
        )
      ) : null}
    </div>
  );
};

export default DragList;
