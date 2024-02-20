"use client";

import React, { useEffect, useState } from "react";

const Loader = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);
  return (
    <>
      {loading ? (
        <div className="fixed inset-0 z-[50] flex h-full w-full items-center justify-center bg-background">
          <Loader />
        </div>
      ) : null}
    </>
  );
};

export default Loader;
