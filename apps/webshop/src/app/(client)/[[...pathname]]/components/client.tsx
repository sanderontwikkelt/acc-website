"use client";

import React, { useCallback, useEffect, useState } from "react";

import type { Block } from "~/lib/blocks";
import type { FooterType, HeaderType } from "~/lib/types";
import Footer from "~/components/footer";
import Header from "~/components/header";
import { API_URL } from "~/lib/constants";
import BlocksRenderer from "./blocks-renderer";

interface Data {
  header: HeaderType;
  blocks: Block[];
  footer: FooterType;
}

const Client = () => {
  const [data, setData] = useState<Data | null>(null);

  const getMessage = useCallback(
    (event: MessageEvent) => {
      if (event.origin === API_URL) {
        setData(event.data as Data);
      }
    },
    [setData],
  );

  useEffect(() => {
    window.addEventListener("message", getMessage);

    return () => {
      window.removeEventListener("message", getMessage);
    };
  }, [getMessage]);

  return data ? (
    <>
      <Header header={data.header} />
      <main className="min-h-screen w-full">
        <BlocksRenderer blocks={data.blocks} client />
      </main>
      <Footer footer={data.footer} />
    </>
  ) : null;
};

export default Client;
