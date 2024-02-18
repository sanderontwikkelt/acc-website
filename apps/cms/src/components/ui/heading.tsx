import type { ReactNode } from "react";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

import { Card } from "./card";

interface HeadingProps {
  title: string;
  description: string;
  backHref?: string;
  children?: ReactNode;
}

export const Heading: React.FC<HeadingProps> = ({
  title,
  description,
  children,
  backHref,
}) => {
  return (
    <Card className="flex w-full items-center justify-between space-x-4">
      <div className="flex items-center">
        <div>
          <h2 className="mb-1 text-2xl font-semibold tracking-tight">
            {title}
          </h2>
          {backHref ? (
            <Link href={backHref} className="h-5 hover:underline">
              <ChevronLeft className="mr-1 inline h-5 w-5" />
              Terug naar overzicht
            </Link>
          ) : (
            <p className="text-sm text-muted-foreground max-md:hidden">
              {description}
            </p>
          )}
        </div>
      </div>
      {children}
    </Card>
  );
};
