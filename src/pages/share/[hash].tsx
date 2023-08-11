import { join } from 'path';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { promises as fsPromises, constants as fsConstants } from 'fs';

import { BlcokPreivew } from '~/components';
import { DB_DIR_NAME } from '~/features/editor/constatns';
import type { Blocks } from '~/features/editor/interface';

export default function ViewPage({
  blocks,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <div className="container">
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
    </div>
  );
}

interface SharePageProps {
  blocks: Blocks;
}

export const getServerSideProps: GetServerSideProps<SharePageProps> = async ({
  params,
}) => {
  if (process.env.NEXT_PUBLIC_IS_SERVED_FROM_VERCEL) {
    /* 
      NOTE:
      Sharing mechanisms utilize the local file system, which is not persistent in serverless deployment environments like Vercel. 
      In such an environment, it is advisable to abstract the process of saving and reading JSON files by employing a distributed file system such as Amazon S3, and similar alternatives.
    */
    return { notFound: true };
  }

  try {
    const hash = params?.hash as string;
    const filePath = join(process.cwd(), DB_DIR_NAME, `${hash}.json`);
    await fsPromises.access(filePath, fsConstants.F_OK);
    const fileContents = await fsPromises.readFile(filePath, 'utf-8');
    const jsonData = JSON.parse(fileContents);

    return {
      props: {
        blocks: jsonData || [],
      },
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      notFound: true,
    };
  }
};
