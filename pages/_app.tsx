import type { AppProps } from "next/app";
import { ThemeProvider } from "next-themes";
import { globalCss, darkTheme } from "stitches.config";

const globalStyles = globalCss({
  "*, *::before, *::after": {
    boxSizing: "border-box",
  },

  body: {
    margin: 0,
    backgroundColor: "$loContrast",
    fontFamily: "$inter",
    WebkitFontSmoothing: "antialiased",
    MozOsxFontSmoothing: "grayscale",
    WebkitTextSizeAdjust: "100%",

    ".dark-theme &": {
      backgroundColor: "$mauve1",
    },
  },

  svg: {
    display: "block",
    verticalAlign: "middle",
  },

  "::selection": {
    backgroundColor: "$violet5",
  },

  "#__next": {
    position: "relative",
    zIndex: 0,
  },
});

function BabaBooey({ Component, pageProps }: AppProps): JSX.Element {
  globalStyles();

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      value={{ light: "light-theme", dark: darkTheme.className }}
      disableTransitionOnChange
      enableColorScheme
      enableSystem
    >
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
export default BabaBooey;
