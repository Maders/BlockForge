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

import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Label,
} from '~/components/ui';
import { useBlocks } from '~/features/editor/context';
import { DEFAULT_IMAGE } from '~/features/editor/constatns';

const presentingBlockList = {
  Image: { icon: Image, disabled: false },
  Text: { icon: Type, disabled: false },
  HTML: { icon: FileCode, disabled: true },
};

const inputBlockList = {
  'Text input': { icon: TextCursorInput, disabled: false },
  'Markup input': { icon: FileEdit, disabled: true },
  'Calendar input': { icon: CalendarDays, disabled: true },
  'Phone number input': { icon: Phone, disabled: true },
  'Range Input (slider)': { icon: SlidersHorizontal, disabled: true },
  'Dropdown input': { icon: LayoutList, disabled: true },
  'Checkbox input': { icon: CheckSquare, disabled: true },
  'Radio input': { icon: CheckCircle, disabled: true },
  'File input': { icon: Paperclip, disabled: true },
} as const;

export function AddBlocksDialog() {
  const { dispatch } = useBlocks();

  function handleAddBlocks(type: string) {
    return () => {
      switch (type) {
        case 'Image': {
          dispatch({
            type: 'ADD_IMAGE_BLOCK',
            payload: {
              url: DEFAULT_IMAGE,
              alt: 'default image',
            },
          });
          break;
        }
        case 'Text input': {
          dispatch({
            type: 'ADD_INPUT_BLOCK',
            payload: {
              label: 'label:',
              placeholder: 'default placeholder',
            },
          });
          break;
        }
        case 'Text': {
          dispatch({
            type: 'ADD_TEXT_BLOCK',
            payload: {
              text: 'This a default text.',
            },
          });
          break;
        }
        default:
          break;
      }
    };
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button aria-label="Add blocks" variant="default">
          <Plus className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] lg:max-w-3xl">
        <DialogHeader>
          <DialogTitle>Add Blocks</DialogTitle>
          <DialogDescription>
            Add new blocks from the following list. (Disabled blocks will be
            implemented in the future 🚀)
          </DialogDescription>
        </DialogHeader>
        <Label>Presentation blocks:</Label>
        <div className="grid gap-4 grid-cols-3 items-center py-2">
          {Object.entries(presentingBlockList).map(([name, obj]) => (
            <Button
              variant="outline"
              key={name}
              disabled={obj.disabled}
              onClick={handleAddBlocks(name)}
            >
              <obj.icon className="mr-2 h-4 w-4" /> {name}
            </Button>
          ))}
        </div>
        <Label>Input blocks:</Label>
        <div className="grid gap-4 grid-cols-3 items-center py-4">
          {Object.entries(inputBlockList).map(([name, obj]) => (
            <Button
              key={name}
              variant="outline"
              disabled={obj.disabled}
              onClick={handleAddBlocks(name)}
            >
              <obj.icon className="mr-2 h-4 w-4" /> {name}
            </Button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
