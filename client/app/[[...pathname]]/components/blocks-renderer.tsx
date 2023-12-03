import Section from '@/components/section'
import { Block, blocks } from '@/lib/blocks'
import React from 'react'

const BlocksRenderer = ({
  blocks: blocksData,
  client,
}: {
  blocks: Block[]
  client?: boolean
}) => {
  return blocksData.map(
    ({ name, fields, id, uid, ...props }: Block, i: number) => {
      const Component = blocks[name]
      return (
        <Section
          key={uid}
          {...props}
          id={uid}
          innerId={id}
          client={client}
          isFirst={i === 0}
          isLast={i === blocksData.length - 1}
        >
          <Component {...fields} />
        </Section>
      )
    }
  )
}

export default BlocksRenderer
