import { useState } from 'react';
import { Copy, Share2 } from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
  Button,
  Label,
  Input,
} from '~/components/ui';
import { PERSIST_KEY } from '~/features/editor/constatns';

export function ShareButton() {
  const [shareUrl, setShareUrl] = useState<null | string>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<null | string>(null);

  const handleShare = async () => {
    setLoading(true);
    setError(null);

    try {
      const data = localStorage.getItem(PERSIST_KEY);
      const response = await fetch('/api/save-wall', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: data,
      });

      if (!response.ok) {
        throw new Error('Failed to save wall');
      }

      const result = await response.json();
      setShareUrl(
        `${process.env.NEXT_PUBLIC_APP_URL ?? window.location.origin}/share/${
          result.name
        }`
      );
    } catch (error) {
      setError('An error occurred while saving');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    if (!shareUrl) return;

    try {
      await navigator.clipboard.writeText(shareUrl);
    } catch (error) {
      console.error('Error copying link:', error);
    }
  };

  const handleRest = () => {
    setShareUrl(null);
    setError(null);
  };

  return (
    <Popover>
      <PopoverTrigger asChild onClick={handleRest}>
        <Button variant="secondary">
          <Share2 className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-[520px]">
        <div className="flex flex-col space-y-2 text-center sm:text-left">
          <h3 className="text-lg font-semibold">Share this wall</h3>
        </div>
        {!shareUrl ? (
          <>
            <p className="text-sm text-muted-foreground pb-2">
              {`If you click on 'Create Shareable Link', you'll be able to share
              the result link with anyone.`}
            </p>
            <Button onClick={handleShare} disabled={loading} variant="outline">
              {loading ? 'Saving...' : 'Create Shareable Link'}
            </Button>
          </>
        ) : (
          <>
            <p className="text-sm text-muted-foreground">
              Anyone who has this link will be able to view this wall in guest
              mode.
            </p>
            <div className="flex items-center space-x-2 pt-4">
              <div className="grid flex-1 gap-2">
                <Label htmlFor="link" className="sr-only">
                  Link
                </Label>
                <Input
                  id="link"
                  defaultValue={shareUrl}
                  readOnly
                  className="h-9"
                />
              </div>
              <Button
                type="submit"
                size="sm"
                className="px-3"
                onClick={handleCopy}
              >
                <span className="sr-only">Copy</span>
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </>
        )}
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </PopoverContent>
    </Popover>
  );
}
