import React from "react";

import Section from "~/components/section";
import { Block, blocks } from "~/lib/blocks";

const BlocksRenderer = ({
  blocks: blocksData,
  client,
}: {
  blocks: Block[];
  client?: boolean;
}) => {
  return blocksData.map(
    ({ name, fields, id, uid, ...props }: Block, i: number) => {
      const Component = blocks[name];
      return (
        <Section
          key={uid}
          fields={fields}
          {...props}
          id={uid}
          innerId={id}
          client={client}
          isFirst={i === 0}
          isLast={i === blocksData.length - 1}
        >
          <Component {...fields} />
        </Section>
      );
    },
  );
};

export default BlocksRenderer;
