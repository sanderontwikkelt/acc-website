"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { ImagePlus } from "lucide-react";

import { Button } from "@acme/ui";

import { api } from "~/trpc/react";
import { Loader } from "./loader";

const UploadButton = () => {
  const [loading, setLoading] = useState(false);
  const utils = api.useUtils();

  const onCreate = api.media.create.useMutation({
    onSuccess: async () => {
      await utils.media.invalidate();
      router.refresh();
      setLoading(false);
    },
  });
  const router = useRouter();

  const onChange = async (files: FileList | null) => {
    if (!files) return;
    setLoading(true);

    try {
      const formData = new FormData();
      const file = files[0];
      if (!file) return;
      formData.append("file", file);

      const response = await axios.post<{
        filename: string;
        filepath: string;
        size: number;
        mimetype: string;
        width: number;
        height: number;
        url: string;
      }>("/api/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      await onCreate.mutateAsync(response.data);
    } catch (error) {
      console.error("Error uploading file:", error);
      setLoading(false);
    }
  };
  return (
    <div>
      <input
        type="file"
        hidden
        id="media-model-upload"
        accept="image/*,video/*"
        onChange={(e) => onChange(e.target.files)}
      />
      <Button
        type="button"
        className="relative overflow-hidden"
        variant="outline"
        disabled={loading}
        onClick={(e) => {
          console.log(
            e,
            loading,
            document?.getElementById("media-model-upload"),
          );
          e.stopPropagation();
          document?.getElementById("media-model-upload")?.click();
        }}
      >
        <ImagePlus className="mr-2 h-4 w-4" />
        Toevoegen
        {loading ? (
          <div className="absolute inset-0 flex items-center justify-center bg-foreground">
            <Loader size={30} />
          </div>
        ) : null}
      </Button>
    </div>
  );
};

export default UploadButton;
