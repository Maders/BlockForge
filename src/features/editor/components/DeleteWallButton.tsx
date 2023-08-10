import { RotateCcw } from 'lucide-react';
import { Button } from '~/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '~/components/ui/dialog';
import { useBlocksContext } from '../context';
import { defaultValue } from '../context/BlocksContext';

export function DeleteWallButton() {
  const { setBlocks } = useBlocksContext();
  function handleDeleteWall() {
    localStorage.clear();
    setBlocks(defaultValue);
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary">
          <RotateCcw className="mr-2 h-4 w-4" />
          <span>Reset</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[475px]">
        <DialogHeader>
          <DialogTitle>Reset the wall</DialogTitle>
          <DialogDescription>
            Do you sure for reseting the wall?
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
