import { Button } from '~/components/ui/button';
import { SaveButton, ShareButton } from '.';
import { useBlocksContext } from '../context';
import Link from 'next/link';
import { DeleteWallButton } from './DeleteWallButton';
import { ToyBrick } from 'lucide-react';

export function EditorNavbar() {
  const { blocks } = useBlocksContext();

  return (
    <nav className="flex w-full p-5 my-3 ml-auto border-solid border-2 border-gray-800 rounded-xl scroll-smooth">
      <div className="flex w-full gap-x-4">
        {blocks.map((block) => (
          <Button key={block.id} variant={'secondary'}>
            <ToyBrick className="mr-2 h-4 w-4" />
            <Link href={`#${block.id}`}>{`${block.id}`}</Link>
          </Button>
        ))}
      </div>
      <div className="space-x-2 sm:justify-end flex w-full">
        <DeleteWallButton />
        <SaveButton />
        <div className="hidden space-x-2 md:flex">
          <ShareButton />
        </div>
      </div>
    </nav>
  );
}
