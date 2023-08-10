import {
  CalendarDays,
  CheckSquare,
  CheckCircle,
  Paperclip,
  FileCode,
  Image,
  TextCursorInput,
  FileEdit,
  Phone,
  Plus,
  SlidersHorizontal,
  Type,
  LayoutList,
} from 'lucide-react';

import { Button } from '~/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '~/components/ui/dialog';
import { Label } from '~/components/ui/label';

const presentingBlockList = {
  Image: Image,
  Text: Type,
  // HTML: FileCode,
};

const inputBlockList = {
  'Text input': TextCursorInput,
  // 'Markup input': FileEdit,
  // 'Calendar input': CalendarDays,
  // 'Phone number input': Phone,
  'Range Input (slider)': SlidersHorizontal,
  // 'Dropdown input': LayoutList,
  // 'Checkbox input': CheckSquare,
  // 'Radio input': CheckCircle,
  // 'File input': Paperclip,
};

export function AddBlocksDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button aria-label="Add blocks" variant="default">
          <Plus />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] lg:max-w-3xl">
        <DialogHeader>
          <DialogTitle>Add Blocks</DialogTitle>
          <DialogDescription>
            Add new blocks from the following list.
          </DialogDescription>
        </DialogHeader>
        <Label>Presentation blocks:</Label>
        <div className="grid gap-4 grid-cols-3 items-center py-2">
          {Object.entries(presentingBlockList).map(([name, Icon]) => (
            <Button variant="outline" key={name}>
              <Icon className="mr-2 h-4 w-4" /> {name}
            </Button>
          ))}
        </div>
        <Label>Input blocks:</Label>
        <div className="grid gap-4 grid-cols-3 items-center py-4">
          {Object.entries(inputBlockList).map(([name, Icon]) => (
            <Button key={name} variant="outline">
              <Icon className="mr-2 h-4 w-4" /> {name}
            </Button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
