"use client";

import React from "react";

import { Button } from "@acme/ui";

const CloseWindowButton = () => {
  return (
    <Button onClick={() => typeof window !== "undefined" && window.close()}>
      Venster sluiten
    </Button>
  );
};

export default CloseWindowButton;
