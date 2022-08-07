import { Box } from "@components/Box";
import { Container } from "@components/Container";
import { useAnalytics } from "@lib/analytics";
import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";
import type { AppProps as NextAppProps } from "next/app";
import dynamic from "next/dynamic";
import React, { ReactNode } from "react";
import { darkTheme, globalCss } from "../stitches.config";

// modified version - allows for custom pageProps type, falling back to 'any'
type AppProps<P = any> = {
  pageProps: P;
} & Omit<NextAppProps<P>, "pageProps">;

const DynamicHeader = dynamic(
  async () => {
    const { Header } = await import("../components/Header");
    return Header;
  },
  {
    loading: () => {
      return <Box as="header" css={{ height: "$12" }} />;
    },
  }
);

const DynamicFooter = dynamic(
  async () => {
    const { Footer } = await import("../components/Footer");
    return Footer;
  },
  {
    loading: () => {
      return <footer />;
    },
  }
);

const DynamicTooltip = dynamic(async () => {
  const { TooltipProvider } = await import("../components/Tooltip");
  return TooltipProvider;
});

const DynamicCommandPalette = dynamic<{ children?: ReactNode }>(
  async () => {
    const { CommandPalette } = await import("../components/CommandPalette");
    return CommandPalette;
  },
  { ssr: false }
);

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
        <DynamicTooltip>
          <DynamicCommandPalette>
            <Container
              css={{
                display: "flex",
                flexDirection: "column",
                minHeight: "100vh",
                py: "$6",
              }}
              size="2"
            >
              <DynamicHeader />
              <Component {...pageProps} />
              <DynamicFooter />
            </Container>
          </DynamicCommandPalette>
        </DynamicTooltip>
      </SessionProvider>
    </ThemeProvider>
  );
}

export default BabaBooey;
