/* eslint-disable react/no-danger */

import { Html, Head, Main, NextScript } from "next/document";
import { getCssText, reset } from "stitches.config";

/**
 * Get the css and reset the internal css representation.
 * This is very *IMPORTANT* to do as the server might handle multiple requests
 * and we don't want to have the css accumulated from previous requests
 */
const getCssAndReset = () => {
  const css = getCssText();
  reset();
  return css;
};

export default function Document() {
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
        <link
          as="font"
          crossOrigin="anonymous"
          href="/fonts/JetBrainsMono-Regular.woff2"
          rel="preload"
          type="font/woff2"
        />
        <style
          dangerouslySetInnerHTML={{ __html: getCssAndReset() }}
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
                @font-face {
                  font-family: 'JetBrains Mono';
                  font-style: normal;
                  font-weight: 400;
                  font-display: optional;
                  src: url(/fonts/JetBrainsMono-Regular.woff2) format('woff2');
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
