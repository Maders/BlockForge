import '~/styles/globals.css';
import type { AppProps } from 'next/app';
import { ThemeProvider } from '~/components/ui';
import { Header } from '~/components';
import Head from 'next/head';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>MicroWall - Crafting Dynamic Blocks</title>
        <meta
          name="description"
          content="Engagement with MicroWall – a simple app for integrating presentation and interaction blocks."
        />
      </Head>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <main className="flex min-h-screen flex-col">
          <Header />
          <div className="flex flex-col bg-primary-foreground w-full min-h-screen">
            <Component {...pageProps} />
          </div>
        </main>
      </ThemeProvider>
    </>
  );
}
