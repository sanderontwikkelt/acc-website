import { ReactNode } from "react";

import { Card } from "./card";

interface HeadingProps {
  title: string;
  description: string;
  children?: ReactNode;
}

export const Heading: React.FC<HeadingProps> = ({
  title,
  description,
  children,
}) => {
  return (
    <Card className="flex w-full px-6 py-4 max-md:flex-col max-md:space-y-4 md:items-center md:justify-between md:space-x-4">
      <div>
        <h2 className="mb-1 text-2xl font-semibold tracking-tight">{title}</h2>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      {children}
    </Card>
  );
};
