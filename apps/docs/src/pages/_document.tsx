import React from 'react';
import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext
} from 'next/document';
import { CssBaseline } from '@nextui-org/react';
import flush from 'styled-jsx/server';

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    const styledJSXStyles = flush();

    return {
      ...initialProps,
      styles: [
        <>
          {initialProps.styles}
          {styledJSXStyles}
        </>
      ]
    };
  }
  render() {
    return (
      <Html lang="en">
        <Head>{CssBaseline.flush()}</Head>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
