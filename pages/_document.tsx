import React from "react";
import NextDocument, { Html, Head, Main, NextScript } from "next/document";
import { getCssText } from "../stitches.config";

export default class Document extends NextDocument {
  render(): JSX.Element {
    return (
      <Html lang="en">
        <Head>
          <link
            as="font"
            crossOrigin="anonymous"
            href="/fonts/Inter-var.woff2"
            rel="preload"
            type="font/woff2"
          />
          <link
            as="font"
            crossOrigin="anonymous"
            href="/fonts/iAWriterQuattroV.woff2"
            rel="preload"
            type="font/woff2"
          />
          <style
            dangerouslySetInnerHTML={{ __html: getCssText() }}
            id="stitches"
          />
          <style
            dangerouslySetInnerHTML={{
              __html: `
                @font-face {
                  font-family: 'iAWriter Quattro';
                  font-weight: 200 900;
                  font-display: optional;
                  src: url(/fonts/iAWriterQuattroV.woff2) format('woff2');
                }
                @font-face {
                  font-family: 'Inter';
                  font-style: normal;
                  font-weight: 100 900;
                  font-display: optional;
                  src: url(/fonts/Inter-var.woff2) format('woff2');
                }
              `,
            }}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
