import Link from 'next/link';
import { ModeToggle, Separator } from '~/components/ui';

export function Header() {
  return (
    <header className="h-full flex-col flex">
      <div className="container flex flex-row items-center space-y-0 h-16">
        <Link href="/">
          <h2 className="text-lg font-semibold justify-start">MicroWall</h2>
        </Link>
        <div className="ml-auto justify-end">
          <ModeToggle />
        </div>
      </div>
      <Separator />
    </header>
  );
}
