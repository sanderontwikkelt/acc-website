"use client";

import React from "react";
import { Button } from "./button";

const SubmitButton = ({
  title,
  loading,
}: {
  title: string;
  loading?: boolean;
}) => {
  return (
    <Button
      type="submit"
      className="w-min"
      size="lg"
      aria-label={title}
      disabled={loading}
    >
      {title}
    </Button>
  );
};

export default SubmitButton;
