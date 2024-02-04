"use client";

import { ClipLoader } from "react-spinners";

export const Loader = ({ size }: { size?: number }) => {
  return <ClipLoader color="#3498db" size={size || 50} />;
};
