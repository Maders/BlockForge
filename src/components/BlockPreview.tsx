import { Label, Input } from '~/components/ui';
import type { BlockTypes } from '~/features/editor/interface';

export function BlcokPreivew({ block }: { block: BlockTypes }) {
  switch (block.type) {
    case 'img': {
      return (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={block.url}
          alt={block.alt}
          width={block.width}
          height={block.height}
        />
      );
    }

    case 'text': {
      return <p>{block.text}</p>;
    }

    case 'input': {
      return (
        <div className="w-full">
          {block.label && <Label htmlFor={block.id}>{block.label}</Label>}
          <Input type="text" id={block.id} placeholder={block.placeholder} />
        </div>
      );
    }

    default:
      return null;
  }
}
