import { Input, Label, Button } from '~/components/ui';
import { useBlocks } from '~/features/editor/context';
import { ImageBlcok } from '~/features/editor/interface';

export function BlockEditImage({
  id,
  height,
  width,
  alt,
  url,
  onClose,
}: ImageBlcok & { onClose: () => void }) {
  const { dispatch } = useBlocks();

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();

        const target = e.target as typeof e.target & {
          url: { value: string };
          alt: { value?: string };
          width: { value?: string };
          height: { value?: string };
        };

        dispatch({
          type: 'EDIT_IMAGE_BLOCK',
          payload: {
            id,
            url: target.url.value,
            alt: target.alt.value,
            width: target.width.value,
            height: target.height.value,
          },
        });
        onClose();
      }}
      className="flex flex-col gap-2 px-10 items-start"
    >
      <div className="w-full">
        <Label htmlFor="image-url">* Image URL:</Label>
        <Input
          type="url"
          id="image-url"
          name="url"
          placeholder="Enter Image URL"
          defaultValue={url}
          required
        />
      </div>

      <div className="w-full">
        <Label htmlFor="alt">* Image Alt:</Label>
        <Input
          type="text"
          id="alt"
          name="alt"
          placeholder="enter alt for the image"
          defaultValue={alt}
          required
        />
      </div>

      <div className="w-full flex flex-row gap-5">
        <div className="w-full ">
          <Label htmlFor="width">Image Width:</Label>
          <Input
            type="text"
            id="width"
            name="width"
            placeholder="enter width for the image"
            defaultValue={width}
          />
        </div>
        <div className="w-full">
          <Label htmlFor="height">Image Height:</Label>
          <Input
            type="text"
            id="height"
            name="height"
            placeholder="enter height for the image"
            defaultValue={height}
          />
        </div>
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
