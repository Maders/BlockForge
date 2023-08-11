import { AddBlocksDialog } from '~/features/editor/components';
import { BlocksProvider } from '~/features/editor/context';
import dynamic from 'next/dynamic';

const EditorBoardPage = dynamic(
  () =>
    import('~/features/editor/EditorBoardPage').then(
      (component) => component.EditorBoardPage
    ),
  {
    ssr: false,
    loading: () => <p>Loading main board...</p>,
  }
);

const EditorNavbar = dynamic(
  () =>
    import('~/features/editor/components/EditorNavbar').then(
      (component) => component.EditorNavbar
    ),
  {
    ssr: false,
    loading: () => <p>Loading navbar...</p>,
  }
);

export default function EditorPage() {
  return (
    <div className="container">
      <BlocksProvider>
        <EditorNavbar />

        <EditorBoardPage />

        <div className="fixed bottom-10 right-10">
          <AddBlocksDialog />
        </div>
      </BlocksProvider>
    </div>
  );
}
