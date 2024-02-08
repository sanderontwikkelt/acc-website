"use client";

import React, { useState } from "react";
import Image from "next/image";

interface ImageUploadProps {
  disabled?: boolean;
  name: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Upload = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & ImageUploadProps
>(({ name, disabled, onChange, ...props }, ref) => {
  const [url, setUrl] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e);
    const selectedFile = e.target.files?.[0];
    if (selectedFile) setUrl(URL.createObjectURL(selectedFile));
  };
  return (
    <div ref={ref} {...props}>
      <div className="mb-4 flex items-center gap-4">
        {!!url && (
          <div
            key={url}
            className="relative my-4 h-[200px] w-[200px] overflow-hidden rounded-md"
          >
            <div className="absolute right-2 top-2 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-accent shadow">
              <button onClick={() => setUrl("")} aria-label="Verwijderen">
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 800 800"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M633.333 166.667L166.666 633.333M166.667 166.667L633.333 633.333"
                    stroke="black"
                    strokeWidth="50"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
            <Image fill className="object-contain" alt="Image" src={url} />
          </div>
        )}
      </div>
      <div>
        <input
          type="file"
          id="upload-input"
          hidden
          accept="image/*"
          name={name}
          onChange={handleChange}
        />
        <button
          type="button"
          disabled={disabled}
          aria-label="Upload"
          className="flex h-[7.875rem] w-full items-center justify-center rounded-[0.375rem] border border-primary bg-primary/10 p-5"
          onClick={() => document?.getElementById("upload-input")?.click()}
        >
          Klik om
          <span className="mx-1 font-bold text-primary">een bestand</span> te
          uploaden
        </button>
      </div>
    </div>
  );
});
Upload.displayName = "Upload";

export default Upload;
