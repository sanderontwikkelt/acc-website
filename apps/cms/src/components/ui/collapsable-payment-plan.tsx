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
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
 } from "~/components/ui/select";

export interface PaymentPlan {
  rate?: number;
  frequency?: string;
  length?: number;
  price?: number;
};

interface Props {
  value: PaymentPlan;
  setValue: (v: PaymentPlan) => void;
};

export function CollapsiblePaymentPlan({ value, setValue }: Props) {
  const { 
    rate,
frequency,
length,
price,
   } = value;
  const [isOpen, setIsOpen] = React.useState(false);

  const onChange = (f: string, v: string | number) => setValue({ ...value, [f]: v });

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className="h-full w-full space-y-2"
    >
      <div className="flex h-full items-center justify-between space-x-4">
        
          <div className="w-full space-y-2">
            <Input
              placeholder="Prijs"
              value={price}
              type="number"
              onChange={(e) => onChange("price", e.target.value ? +e.target.value : null)}
            />
          </div>
        <CollapsibleTrigger asChild>
          <Button variant="outline" size="icon" className="w-9 p-0">
            <ChevronsUpDown className="h-4 w-4" />
            <span className="sr-only">Toggle</span>
          </Button>
        </CollapsibleTrigger>
      </div>
      <div className="space-y-2">
        
        <CollapsibleContent className="space-y-2">
        <Select
            onValueChange={(v) => onChange('rate', +v)}
            value={rate ? String(rate) : undefined}
            >
            <SelectTrigger>
              <SelectValue placeholder="Selecteer een aantal" />
            </SelectTrigger>
            <SelectContent>
              {Array(6).fill(0).map((_, i) => (
                <SelectItem key={i} value={String(i + 1)}>
                  Iedere {i ? i + 1 + ' ' : ''}keer
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        <Select
            onValueChange={(v) => onChange('frequency', v)}
            value={frequency}
            >
            <SelectTrigger>
              <SelectValue placeholder="Selecteer een frequentie" />
            </SelectTrigger>
            <SelectContent>
              {[
                { label: 'Dag', value: 'day'},
                { label: 'Week', value: 'week'},
                { label: 'Maand', value: 'month'},
                { label: 'Jaar', value: 'year'},
              ].map(({label, value}) => (
                <SelectItem key={value} value={value}>
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select
            onValueChange={(v) => onChange('length', +v)}
            value={length ? String(length) : undefined}
            >
            <SelectTrigger>
              <SelectValue placeholder="Selecteer een aantal" />
            </SelectTrigger>
            <SelectContent>
              {Array(6).fill(0).map((_, i) => (
                <SelectItem key={i} value={String(i + 1)}>
                  {i + 1} {i ? "betalingen" : "betaling"}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CollapsibleContent>
      </div>
    </Collapsible>
  );
}
