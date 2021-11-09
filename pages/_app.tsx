import type { AppProps } from "next/app";
import { ThemeProvider } from "next-themes";
import { globalCss, darkTheme } from "stitches.config";
import { IdProvider } from "@radix-ui/react-id";
import { Container } from "@components/Container";
import { Header } from "@components/Header";

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
      <IdProvider>
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
        </Container>
      </IdProvider>
    </ThemeProvider>
  );
}

export default BabaBooey;
