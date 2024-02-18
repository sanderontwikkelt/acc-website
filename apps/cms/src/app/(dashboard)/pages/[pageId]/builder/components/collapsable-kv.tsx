"use client";

import * as React from "react";
import { ChevronsUpDown } from "lucide-react";

import { Button } from "~/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "~/components/ui/collapsible";
import { Input } from "~/components/ui/input";
import RichText from "~/components/ui/rich-text";

export interface KV {
  title?: string;
  description?: string;
}

interface Props {
  children: React.ReactNode;
  value: KV;
  setValue: (v: KV) => void;
}

export function CollapsibleKV({ children, value, setValue }: Props) {
  const { title, description } = value;
  const [isOpen, setIsOpen] = React.useState(false);

  const onChange = (f: string, v: string) => setValue({ ...value, [f]: v });

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className="h-full w-full space-y-2"
    >
      <div className="flex h-full items-center justify-between space-x-4">
        {children || (
          <div className="w-full space-y-2">
            <Input
              placeholder="Titel"
              value={title}
              onChange={(e) => onChange("title", e.target.value)}
            />
          </div>
        )}
        <CollapsibleTrigger asChild>
          <Button variant="outline" size="icon" className="w-9 p-0">
            <ChevronsUpDown className="h-4 w-4" />
            <span className="sr-only">Toggle</span>
          </Button>
        </CollapsibleTrigger>
      </div>
      <div className="space-y-2">
        {!!children && (
          <div className="space-y-2">
            <Input
              placeholder="Titel"
              value={title}
              onChange={(e) => onChange("title", e.target.value)}
            />
          </div>
        )}
        <CollapsibleContent className="space-y-2">
          <RichText
            value={description}
            id="description"
            onChange={(e) => onChange("description", e)}
          />
        </CollapsibleContent>
      </div>
    </Collapsible>
  );
}
