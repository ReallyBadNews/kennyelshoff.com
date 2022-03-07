import { Container } from "@components/Container";
import Footer from "@components/Footer";
import { Header } from "@components/Header";
import { TooltipProvider } from "@components/Tooltip";
import { ThemeProvider } from "next-themes";
import type { AppProps } from "next/app";
import { darkTheme, globalCss } from "stitches.config";

const globalStyles = globalCss({
  /**
   */
  "*, *::before, *::after": {
    boxSizing: "border-box",
  },

  "*": {
    margin: 0,
  },

  "html, body": {
    height: "100%",
  },

  body: {
    lineHeight: "1.5",
    backgroundColor: "$loContrast",
    fontFamily: "$inter",
    WebkitFontSmoothing: "antialiased",
    MozOsxFontSmoothing: "grayscale",
    WebkitTextSizeAdjust: "100%",
  },

  "img, picture, video, canvas, svg": {
    display: "block",
    maxWidth: "100%",
  },

  "input, button, textarea, select": {
    font: "inherit",
  },

  "p, h1, h2, h3, h4, h5, h6": {
    overflowWrap: "break-word",
  },

  figure: {
    margin: 0,
  },

  cite: {
    fontStyle: "unset",
  },

  svg: {
    display: "block",
    verticalAlign: "middle",
  },

  "::selection": {
    backgroundColor: "$purple3",
  },

  "#root, #__next": {
    isolation: "isolate",
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
      <TooltipProvider>
        <Container
          css={{
            display: "flex",
            flexDirection: "column",
            minHeight: "100vh",
            py: "$6",
          }}
          size="2"
        >
          <Header />
          <Component {...pageProps} />
          <Footer />
        </Container>
      </TooltipProvider>
    </ThemeProvider>
  );
}

export default BabaBooey;
