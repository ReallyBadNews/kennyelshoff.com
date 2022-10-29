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
        <style
          dangerouslySetInnerHTML={{ __html: getCssAndReset() }}
          id="stitches"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
