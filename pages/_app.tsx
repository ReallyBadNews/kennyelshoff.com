import { Container } from "@components/Container";
import Footer from "@components/Footer";
import { Header } from "@components/Header";
import { TooltipProvider } from "@components/Tooltip";
import { useAnalytics } from "@lib/analytics";
import { ThemeProvider } from "next-themes";
import type { AppProps } from "next/app";
import { darkTheme, globalCss } from "stitches.config";
import dynamic from "next/dynamic";

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

const CommandPalette = dynamic(
  async () => {
    const commandPallette = await import(
      "../components/CommandPalette/CommandPalette"
    ).then((module) => {
      return module.CommandPalette;
    });

    return commandPallette;
  },
  {
    ssr: false,
  }
);

function BabaBooey({ Component, pageProps }: AppProps): JSX.Element {
  globalStyles();
  useAnalytics();

  return (
    <ThemeProvider
      attribute="class"
      value={{ light: "light-theme", dark: darkTheme.className }}
      disableTransitionOnChange
    >
      <TooltipProvider>
        <CommandPalette>
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
        </CommandPalette>
      </TooltipProvider>
    </ThemeProvider>
  );
}

export default BabaBooey;
