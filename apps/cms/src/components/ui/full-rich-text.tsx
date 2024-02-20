import React from "react";
import { Editor } from "@tinymce/tinymce-react";
import { sanitize } from "isomorphic-dompurify";

const FullRichText = ({
  value,
  onChange,
  id,
}: {
  id: string;
  value: string;
  onChange: (v: string) => void;
}) => {
  return (
    <Editor
      apiKey={process.env.NEXT_PUBLIC_TINY_MCE_API_KEY}
      value={value}
      id={id}
      onEditorChange={(v) => onChange(sanitize(v))}
      init={{
        plugins:
          "anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount",
        menubar: false,
        statusbar: false,
        toolbar:
          "undo redo | blocks | bold italic underline strikethrough | link image media table | align | numlist bullist indent outdent | emoticons charmap",
      }}
    />
  );
};

export default FullRichText;
