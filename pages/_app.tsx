import { CommandPalette } from "@components/CommandPalette";
import { Container } from "@components/Container";
import Footer from "@components/Footer";
import { Header } from "@components/Header";
import { TooltipProvider } from "@components/Tooltip";
import { useAnalytics } from "@lib/analytics";
import { ThemeProvider } from "next-themes";
import type { AppProps as NextAppProps } from "next/app";
import { darkTheme, globalCss } from "stitches.config";
import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth";

// modified version - allows for custom pageProps type, falling back to 'any'
type AppProps<P = any> = {
  pageProps: P;
} & Omit<NextAppProps<P>, "pageProps">;

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

function BabaBooey({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps<{ session?: Session }>): JSX.Element {
  globalStyles();
  useAnalytics();

  return (
    <ThemeProvider
      attribute="class"
      value={{ light: "light-theme", dark: darkTheme.className }}
      disableTransitionOnChange
    >
      <SessionProvider session={session}>
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
      </SessionProvider>
    </ThemeProvider>
  );
}

export default BabaBooey;
