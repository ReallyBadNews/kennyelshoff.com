import { Container } from "@components/Container";
import { Header } from "@components/Header";
import { useAnalytics } from "@lib/analytics";
import { Inter, JetBrains_Mono } from "@next/font/google";
import localFont from "@next/font/local";
import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";
import type { AppProps as NextAppProps } from "next/app";
import dynamic from "next/dynamic";
import { darkTheme, globalCss } from "../stitches.config";

// modified version - allows for custom pageProps type, falling back to 'any'
type AppProps<P = any> = {
  pageProps: P;
} & Omit<NextAppProps<P>, "pageProps">;

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

const DynamicCommandPalette = dynamic(async () => {
  const { CommandPalette } = await import("../components/CommandPalette");
  return CommandPalette;
});

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
    height: "auto",
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

const inter = Inter({
  variable: "--fonts-inter",
  subsets: ["latin"],
});

const jetBrainsMono = JetBrains_Mono({
  variable: "--fonts-jet",
  subsets: ["latin"],
});

const iaWritterQuattro = localFont({
  variable: "--fonts-mono",
  src: "../public/fonts/iAWriterQuattroV.woff2",
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
              className={`${inter.variable} ${jetBrainsMono.variable} ${iaWritterQuattro.variable}`}
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
              <DynamicFooter />
            </Container>
          </DynamicCommandPalette>
        </DynamicTooltip>
      </SessionProvider>
    </ThemeProvider>
  );
}

export default BabaBooey;
