import { BlocksProvider } from '~/features/editor/context';
import dynamic from 'next/dynamic';

const ViewerBoardPage = dynamic(
  () =>
    import('~/features/viewer/ViewerBoardPage').then(
      (component) => component.ViewerBoardPage
    ),
  {
    ssr: false,
    loading: () => <p>Loading main board...</p>,
  }
);

export default function ViewPage() {
  return (
    <div className="container">
      <BlocksProvider>
        <ViewerBoardPage />
      </BlocksProvider>
    </div>
  );
}
