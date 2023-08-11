import Link from 'next/link';
import { Eye, ToyBrick } from 'lucide-react';

import { Button, Separator } from '~/components/ui';
import { useBlocks } from '~/features/editor/context';
import { ShareButton } from './ShareButton';
import { ResetWallButton } from './RestWallButton';

export function EditorNavbar() {
  const { blocks } = useBlocks();

  return (
    <nav className="flex flex-row gap-1 w-full p-5 my-3 ml-auto border-solid border-2 border-gray-800 rounded-xl scroll-smooth">
      <div className="flex flex-1 flex-wrap gap-2">
        {blocks.map((block) => (
          <Button key={block.id} variant="outline">
            <ToyBrick className="mr-2 h-4 w-4" />
            <Link href={`#${block.id}`}>{`${block.id}`}</Link>
          </Button>
        ))}
      </div>
      <div className="space-x-2 justify-end flex">
        <Separator orientation="vertical" />
        <ResetWallButton />
        {/* NOTE:
          Sharing mechanisms utilize the local file system, which is not persistent in serverless deployment environments like Vercel. 
          In such an environment, it is advisable to abstract the process of saving and reading JSON files by employing a distributed file system such as Amazon S3, and similar alternatives. 
        */}
        {!process.env.NEXT_PUBLIC_IS_SERVED_FROM_VERCEL && <ShareButton />}
        <Link href="/view" target="_blank">
          <Button>
            <Eye className="h-4 w-4" />
          </Button>
        </Link>
      </div>
    </nav>
  );
}
