import '../styles/globals.css';
import { CssBaseline } from '@nextui-org/react';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <CssBaseline />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
