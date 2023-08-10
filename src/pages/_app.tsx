import '~/styles/globals.css';
import type { AppProps } from 'next/app';
import Link from 'next/link';
import { ThemeProvider } from '~/components/ui/theme-provider';
import { ModeToggle } from '~/components/ui/theme-toggle';
import { Separator } from '~/components/ui/separator';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <main className="flex min-h-screen flex-col">
        <header className="h-full flex-col flex">
          <div className="container flex flex-col items-start justify-between space-y-2 py-4 sm:flex-row sm:items-center sm:space-y-0 md:h-16">
            <Link href="/">
              <h2 className="text-lg font-semibold">MicroWall</h2>
            </Link>
            <div className="ml-auto flex w-full space-x-2 sm:justify-end">
              <ModeToggle />
            </div>
          </div>
          <Separator />
        </header>
        {/* bg-primary-foreground bg-inherit */}
        <div className="flex flex-col bg-primary-foreground w-full min-h-screen">
          <Component {...pageProps} />
        </div>
      </main>
    </ThemeProvider>
  );
}
