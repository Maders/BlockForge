import { Label, Button, Input } from '~/components/ui';
import { InputBlock } from '~/features/editor/interface';
import { useBlocks } from '~/features/editor/context';

export function BlockEditInput({
  id,
  label,
  placeholder,
  onClose,
}: InputBlock & { onClose: () => void }) {
  const { dispatch } = useBlocks();
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();

        const target = e.target as typeof e.target & {
          placeholder: { value: string };
          label: { value: string };
        };

        dispatch({
          type: 'EDIT_INPUT_BLOCK',
          payload: {
            id,
            placeholder: target.placeholder.value,
            label: target.label.value,
          },
        });
        onClose();
      }}
      className="flex flex-col gap-2 px-10 items-start"
    >
      <div className="w-1/2">
        <Label htmlFor="placeholder">Placeholder:</Label>
        <Input
          type="text"
          id="placeholder"
          name="placeholder"
          placeholder="enter placeholder for the input"
          defaultValue={placeholder}
        />
      </div>

      <div className="w-1/2">
        <Label htmlFor="label">Label:</Label>
        <Input
          type="text"
          id="label"
          name="label"
          placeholder="enter label for the input"
          defaultValue={label}
        />
      </div>

      <div className="flex gap-3">
        <Button type="submit">save</Button>
        <Button variant={'outline'} onClick={onClose}>
          Discard
        </Button>
      </div>
    </form>
  );
}
