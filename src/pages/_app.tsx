import type { AppProps } from 'next/app';
import SettingsProvider from 'context/Settings';
import 'styles/globals.css';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SettingsProvider>
      <Component {...pageProps} />
    </SettingsProvider>
  );
}
