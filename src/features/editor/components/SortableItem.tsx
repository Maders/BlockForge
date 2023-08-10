import { GripVertical } from 'lucide-react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

export function SortableItem(props: { id: string; children: React.ReactNode }) {
  const { setNodeRef, transform, transition } = useSortable({ id: props.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} className="relative">
      {props.children}
      <DragHandle id={props.id} />
    </div>
  );
}

function DragHandle({ id }: { id: string }) {
  const { attributes, listeners, setNodeRef } = useSortable({ id });

  return (
    <div
      className="absolute top-0 right-0 m-4"
      ref={setNodeRef}
      {...attributes}
      {...listeners}
    >
      <GripVertical className="h-4 w-4" />
    </div>
  );
}
