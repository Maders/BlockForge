import type { BlockTypes } from '~/features/editor/interface';
import { BlockEditInput } from './BlockEditInput';
import { BlockEditImage } from './BlockEditImage';
import { BlockEditText } from './BlockEditText';

export function BlcokEditPreivew({
  block,
  onClose,
}: {
  block: BlockTypes;
  onClose: () => void;
}) {
  switch (block.type) {
    case 'img': {
      return <BlockEditImage {...block} onClose={onClose} />;
    }

    case 'text': {
      return <BlockEditText {...block} onClose={onClose} />;
    }

    case 'input': {
      return <BlockEditInput {...block} onClose={onClose} />;
    }

    default:
      return null;
  }
}
