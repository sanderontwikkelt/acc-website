import React from "react";

import { Button } from "@acme/ui/button";

const DetailButton = ({
  loading,
  hasInitialData,
}: {
  loading: boolean;
  hasInitialData: boolean;
}) => {
  return (
    <Button disabled={loading} className="ml-auto" type="submit">
      {hasInitialData ? "Opslaan" : "Toevoegen"}
    </Button>
  );
};

export default DetailButton;
