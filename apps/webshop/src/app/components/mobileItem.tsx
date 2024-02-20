import type { ReactNode } from "react";
import Link from "next/link";

const MobileItem = ({
  children,
  href,
  ...props
}: {
  children: ReactNode;
  href: string;
  onClick?: () => void;
}) => (
  <>
    <Link
      href={href}
      className="flex justify-between border-b border-gray-300 py-5"
      {...props}
    >
      {children}
    </Link>
  </>
);

export default MobileItem;
