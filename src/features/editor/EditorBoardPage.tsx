import { useBlocksContext } from './context';
import { Label } from '~/components/ui/label';
import { Input } from '~/components/ui/input';
import { BlocksKind } from './context/BlocksContext';

import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';

import React from 'react';
import { Trash2 } from 'lucide-react';
import { SortableItem } from './components/SortableItem';

export function EditorBoardPage() {
  const { blocks, setBlocks } = useBlocksContext();

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  function render(block: BlocksKind) {
    switch (block.type) {
      case 'img': {
        return (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={block.url} alt="empty" />
        );
      }

      case 'text': {
        return (
          // eslint-disable-next-line @next/next/no-img-element
          <p>{block.text}</p>
        );
      }

      case 'html': {
        return (
          // eslint-disable-next-line @next/next/no-img-element
          <div dangerouslySetInnerHTML={{ __html: block.code }} />
        );
      }

      case 'input': {
        return (
          // eslint-disable-next-line @next/next/no-img-element
          <div className="grid w-full max-w-sm items-center gap-1.5">
            {block.label && <Label htmlFor={block.id}>{block.label}</Label>}
            <Input type="text" id={block.id} placeholder={block.placeholder} />
          </div>
        );
      }

      default:
        return null;
    }
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (active.id !== over?.id) {
      setBlocks((items) => {
        const oldIndex = items.findIndex((x) => x.id === active.id);
        const newIndex = items.findIndex((x) => x.id === over?.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  }

  function handleRemoveBlock(id: string) {
    return () =>
      setBlocks((blocks) => blocks.filter((block) => block.id !== id));
  }

  return (
    <main className="py-10 text-primary flex flex-col gap-y-5 px-0">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={blocks} strategy={verticalListSortingStrategy}>
          {blocks.map((block) => {
            return (
              <SortableItem id={block.id} key={block.id}>
                <div
                  className="w-full min-h-[100px] p-2 border-dashed border-2 border-gray-600 rounded-xl relative"
                  id={block.id}
                >
                  {render(block)}
                  <div
                    className="absolute bottom-2 end-0 m-4 cursor-pointer"
                    onClick={handleRemoveBlock(block.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </div>
                </div>
              </SortableItem>
            );
          })}
        </SortableContext>
      </DndContext>
    </main>
  );
}
