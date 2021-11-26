import { Container } from "@components/Container";
import Footer from "@components/Footer";
import { Header } from "@components/Header";
import { IdProvider } from "@radix-ui/react-id";
import { ThemeProvider } from "next-themes";
import type { AppProps } from "next/app";
import { darkTheme, globalCss } from "stitches.config";

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
          <Footer />
        </Container>
      </IdProvider>
    </ThemeProvider>
  );
}

export default BabaBooey;
