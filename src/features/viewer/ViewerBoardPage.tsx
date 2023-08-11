import React from 'react';
import { BlcokPreivew } from '~/components';
import { useBlocks } from '~/features/editor/context';

export function ViewerBoardPage() {
  const { blocks } = useBlocks();

  return (
    <main className="py-5 text-primary flex flex-col gap-y-4 px-0">
      {blocks.map((block) => {
        return (
          <section key={block.id} id={block.id}>
            <div className="flex flex-col">
              <BlcokPreivew block={block} />
            </div>
          </section>
        );
      })}
    </main>
  );
}
