import React from "react";

import type { Block } from "~/lib/blocks";
import Section from "~/components/section";
import { blocks } from "~/lib/blocks";

const BlocksRenderer = ({
  blocks: blocksData,
  client,
}: {
  blocks: Block[];
  client?: boolean;
}) => {
  return blocksData.map(({ name, fields, id, uid, ...props }: Block) => {
    const Component = blocks[name];
    return (
      <Section
        key={uid}
        fields={fields}
        {...props}
        id={uid}
        innerId={id}
        client={client}
      >
        <Component {...fields} />
      </Section>
    );
  });
};

export default BlocksRenderer;
