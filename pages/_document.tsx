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
            href="/fonts/IBMPlexMono-Bold.woff2"
            rel="preload"
            type="font/woff2"
          />
          <link
            as="font"
            crossOrigin="anonymous"
            href="/fonts/IBMPlexMono-Regular.woff2"
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
                  font-family: 'Inter';
                  font-weight: 200 900;
                  font-display: optional;
                  src: url(/fonts/Inter-var.woff2) format('woff2');
                }
                @font-face {
                  font-family: 'Plex Mono';
                  font-weight: 400;
                  font-display: optional;
                  src: url(/fonts/IBMPlexMono-Regular.woff2) format('woff2');
                }
                @font-face {
                  font-family: 'Plex Mono';
                  font-weight: 700;
                  font-display: optional;
                  src: url(/fonts/IBMPlexMono-Bold.woff2) format('woff2');
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
