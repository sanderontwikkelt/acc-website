import Link from "next/link";
import { ReactNode } from "react";

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
      className="flex justify-between py-6"
      aria-label={children?.toString()}
      {...props}
    >
      {children}
    </Link>
    <svg
      width="370"
      height="2"
      viewBox="0 0 370 2"
      fill="none"
      className="max-w-full overflow-hidden"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M0 1H370" stroke="#64BD6E" strokeDasharray="6 6" />
    </svg>
  </>
);

export default MobileItem;
