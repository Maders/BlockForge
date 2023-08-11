import { RotateCcw } from 'lucide-react';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Button,
} from '~/components/ui';

import { useBlocks } from '~/features/editor/context';
import { PERSIST_KEY } from '~/features/editor/constatns';

export function ResetWallButton() {
  const { dispatch } = useBlocks();
  function handleDeleteWall() {
    localStorage.removeItem(PERSIST_KEY);
    dispatch({ type: 'RESET_BLOCKS' });
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary">
          <RotateCcw className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[475px]">
        <DialogHeader>
          <DialogTitle>Reset the wall</DialogTitle>
          <DialogDescription>
            Are you sure you want reset the wall?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose>
            <Button type="reset">Nop</Button>
          </DialogClose>
          <DialogClose>
            <Button
              type="submit"
              variant="destructive"
              onClick={handleDeleteWall}
            >
              Reset
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
