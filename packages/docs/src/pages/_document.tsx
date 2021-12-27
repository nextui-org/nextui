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
      styles: (
        <>
          {initialProps.styles}
          {styledJSXStyles}
        </>
      )
    };
  }
  render() {
    return (
      <Html lang="en">
        <Head>{CssBaseline.flush()}</Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
