import React, { useState } from 'react';
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
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { Trash2, Pencil, X } from 'lucide-react';

import { useBlocks } from './context';
import { DragHandle, SortableItem, BlcokEditPreivew } from './components';
import { BlcokPreivew } from '~/components';

export function EditorBoardPage() {
  const { blocks, dispatch } = useBlocks();
  const [edit, setEdit] = useState<false | string>(false);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (active.id !== over?.id) {
      dispatch({
        type: 'REORDER_BLOCKS',
        payload: {
          currentId: active.id as string,
          targetId: over?.id as string,
        },
      });
    }
  }

  function handleRemoveBlock(id: string) {
    return () => dispatch({ type: 'DELETE_BLOCK', payload: { id } });
  }

  function handleEditBlock(id: string) {
    return () => {
      setEdit(id);
    };
  }

  function closeEditMode() {
    setEdit(() => false);
  }

  return (
    <main className="py-5 text-primary flex flex-col gap-y-5 px-0">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={blocks} strategy={verticalListSortingStrategy}>
          {blocks.map((block) => {
            const isEditActive = !!edit && edit === block.id;

            return (
              <SortableItem id={block.id} key={block.id}>
                <div
                  className="min-h-[100px] p-2 border-dashed border-2 border-gray-600 rounded-xl relative flex flex-row flex-1 justify-between gap-x-10"
                  id={block.id}
                >
                  <div className="flex flex-col flex-1">
                    {isEditActive ? (
                      <BlcokEditPreivew block={block} onClose={closeEditMode} />
                    ) : (
                      <BlcokPreivew block={block} />
                    )}
                  </div>
                  <div className="flex flex-col gap-y-4">
                    <DragHandle id={block.id} />
                    <div
                      onClick={handleRemoveBlock(block.id)}
                      className="cursor-pointer"
                    >
                      <Trash2 className="h-4 w-4" />
                    </div>
                    {!isEditActive ? (
                      <div
                        onClick={handleEditBlock(block.id)}
                        className="cursor-pointer"
                      >
                        <Pencil className="h-4 w-4" />
                      </div>
                    ) : (
                      <div onClick={closeEditMode} className="cursor-pointer">
                        <X className="h-4 w-4" />
                      </div>
                    )}
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
