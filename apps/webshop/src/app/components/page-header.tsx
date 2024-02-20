import React from "react";

const PageHeader = ({ children }: { children }) => {
  return (
    <>
      <h3 className="mb-3 text-xl md:text-3xl">{children}</h3>
      <div className="bg-main mb-10 h-0.5 w-8" />
    </>
  );
};

export default PageHeader;
