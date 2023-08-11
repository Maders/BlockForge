import { Button, Label } from '~/components/ui';
import { TextBlcok } from '~/features/editor/interface';
import { useBlocks } from '~/features/editor/context';

export function BlockEditText({
  id,
  text,
  onClose,
}: TextBlcok & { onClose: () => void }) {
  const { dispatch } = useBlocks();

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();

        const target = e.target as typeof e.target & {
          text: { value: string };
        };

        dispatch({
          type: 'EDIT_TEXT_BLOCK',
          payload: {
            id,
            text: target.text.value,
          },
        });
        onClose();
      }}
      className="flex flex-col gap-2 px-10 items-start"
    >
      <div className="w-full flex flex-col gap-2">
        <Label htmlFor="text">Text:</Label>
        <textarea
          id="text"
          name="text"
          rows={4}
          placeholder="Write your text here..."
          defaultValue={text}
          required
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
