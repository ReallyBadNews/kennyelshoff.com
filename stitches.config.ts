import { createStitches } from "@stitches/react";
import type * as Stitches from "@stitches/react";
import {
  gray,
  slate,
  red,
  crimson,
  pink,
  purple,
  violet,
  indigo,
  blue,
  sky,
  mint,
  cyan,
  teal,
  green,
  lime,
  yellow,
  orange,
  bronze,
  gold,
  grayA,
  slateA,
  redA,
  pinkA,
  purpleA,
  violetA,
  indigoA,
  blueA,
  skyA,
  mintA,
  cyanA,
  tealA,
  greenA,
  limeA,
  yellowA,
  orangeA,
  bronzeA,
  goldA,
  whiteA,
  blackA,
  grayDark,
  slateDark,
  redDark,
  crimsonDark,
  pinkDark,
  purpleDark,
  violetDark,
  indigoDark,
  blueDark,
  skyDark,
  mintDark,
  cyanDark,
  tealDark,
  greenDark,
  limeDark,
  yellowDark,
  orangeDark,
  bronzeDark,
  goldDark,
  grayDarkA,
  slateDarkA,
  redDarkA,
  pinkDarkA,
  purpleDarkA,
  violetDarkA,
  indigoDarkA,
  blueDarkA,
  skyDarkA,
  mintDarkA,
  cyanDarkA,
  tealDarkA,
  greenDarkA,
  limeDarkA,
  yellowDarkA,
  orangeDarkA,
  bronzeDarkA,
  goldDarkA,
} from "@radix-ui/colors";

export type { VariantProps } from "@stitches/react";

const fontStack = {
  heading: [
    "'Inter'",
    "-apple-system",
    "'Seegoee UI'",
    "'Helvetica Neue'",
    "Arial",
    "sans-serif",
  ].join(", "),
  mono: [
    "iAWriter Quattro",
    "SFMono-Regular",
    "Menlo",
    "Monaco",
    "Consolas",
    "Liberation Mono",
    "Courier New",
    "monospace",
  ].join(", "),
  jet: "JetBrains Mono",
};

/**
 * Selectors
 */
export const child = "> *";
export const childWithGap = "> * + *";

export const {
  styled,
  css,
  theme,
  createTheme,
  getCssText,
  globalCss,
  keyframes,
  config,
  reset,
} = createStitches({
  theme: {
    colors: {
      ...gray,
      ...slate,
      ...red,
      ...crimson,
      ...pink,
      ...purple,
      ...violet,
      ...indigo,
      ...blue,
      ...sky,
      ...mint,
      ...cyan,
      ...teal,
      ...green,
      ...lime,
      ...yellow,
      ...orange,
      ...bronze,
      ...gold,

      ...grayA,
      ...slateA,
      ...redA,
      ...pinkA,
      ...purpleA,
      ...violetA,
      ...indigoA,
      ...blueA,
      ...skyA,
      ...mintA,
      ...cyanA,
      ...tealA,
      ...greenA,
      ...limeA,
      ...yellowA,
      ...orangeA,
      ...bronzeA,
      ...goldA,

      ...whiteA,
      ...blackA,

      // Semantic colors
      hiContrast: "$slate12",
      loContrast: "$slate1",
      // loContrast: "white",
      canvas: "hsl(0 0% 93%)",
      panel: "white",
      transparentPanel: "hsl(0 0% 0% / 97%)",
      shadowLight: "hsl(206 22% 7% / 35%)",
      shadowDark: "hsl(206 22% 7% / 20%)",
    },
    fonts: {
      inter: fontStack.heading,
      mono: fontStack.mono,
      jet: fontStack.jet,
    },
    space: {
      0: "0",
      1: "0.25rem",
      2: "0.5rem",
      3: "1rem",
      4: "1.5rem",
      5: "2rem",
      6: "2.5rem",
      7: "3rem",
      8: "4rem",
      9: "6rem",
      10: "8rem",
      11: "16rem",
      12: "32rem",
      px: "1px",
      auto: "auto",
    },
    sizes: {
      0: "0",
      1: "0.25rem",
      2: "0.5rem",
      3: "0.75rem",
      "3.5": "0.875rem",
      4: "1rem",
      5: "1.25rem",
      6: "1.5rem",
      8: "2rem",
      10: "2.5rem",
      12: "3rem",
      14: "3.5rem",
      16: "4rem",
      20: "5rem",
      24: "6rem",
      32: "8rem",
      40: "10rem",
      48: "12rem",
      56: "14rem",
      64: "16rem",
      72: "18rem",
      80: "20rem",
      128: "32rem",
      144: "36rem",
      max: "78rem",
      auto: "auto",
      px: "1px",
      "1/2": "50%",
      "1/3": "33.333333%",
      "2/3": "66.666667%",
      "1/4": "25%",
      "2/4": "50%",
      "3/4": "75%",
      "1/5": "20%",
      "2/5": "40%",
      "3/5": "60%",
      "4/5": "80%",
      "1/6": "16.666667%",
      "2/6": "33.333333%",
      "3/6": "50%",
      "4/6": "66.666667%",
      "5/6": "83.333333%",
      "1/12": "8.333333%",
      "2/12": "16.666667%",
      "3/12": "25%",
      "4/12": "33.333333%",
      "5/12": "41.666667%",
      "6/12": "50%",
      "7/12": "58.333333%",
      "8/12": "66.666667%",
      "9/12": "75%",
      "10/12": "83.333333%",
      "11/12": "91.666667%",
      full: "100%",
      screenWidth: "100vw",
      screenHeight: "100vh",
    },
    fontSizes: {
      0: "0.75rem",
      1: "0.875rem",
      2: "1rem",
      3: "1.125rem",
      4: "1.25rem",
      5: "1.5rem",
      6: "2rem",
      7: "2.5rem",
      8: "3rem",
      9: "4rem",
      10: "4.5rem",
    },
    fontWeights: {
      1: "100",
      4: "400",
      5: "500",
      6: "600",
      7: "700",
      9: "900",
    },
    radii: {
      none: "0",
      sm: "0.125rem",
      rg: "0.25rem",
      md: "0.375rem",
      lg: "0.5rem",
      xl: "1rem",
      round: "50%",
      pill: "9999px",
    },
    zIndices: {
      1: "100",
      2: "200",
      3: "300",
      4: "400",
      max: "999",
    },
    letterSpacings: {
      tighter: "-0.05em",
      tight: "-0.025em",
      normal: "0",
      wide: "0.025em",
      wider: "0.05em",
      widest: "0.1em",
    },
    lineHeights: {
      none: "1",
      tight: "1.375",
      snug: "1.512",
      normal: "1.75",
      relaxed: "1.8",
      loose: "2",
    },
    shadows: {},
  },
  media: {
    bp1: "(min-width: 640px)",
    bp2: "(min-width: 800px)",
    bp3: "(min-width: 1200px)",
    bp4: "(min-width: 1800px)",
    motion: "(prefers-reduced-motion)",
    motionSafe: "(prefers-reduced-motion: no-preference)",
    hover: "(any-hover: hover)",
    dark: "(prefers-color-scheme: dark)",
    light: "(prefers-color-scheme: light)",
  },
  utils: {
    stackGap: (value: Stitches.ScaleValue<"space">) => {
      return {
        [childWithGap]: { $$gap: `$space${value}` },
      };
    },
    bg: (value: Stitches.ScaleValue<"colors">) => {
      return {
        backgroundColor: value,
      };
    },
    p: (
      value: Stitches.ScaleValue<"space"> | Stitches.PropertyValue<"padding">
    ) => {
      return {
        padding: value,
      };
    },
    pt: (
      value: Stitches.ScaleValue<"space"> | Stitches.PropertyValue<"paddingTop">
    ) => {
      return {
        paddingTop: value,
      };
    },
    pr: (
      value:
        | Stitches.ScaleValue<"space">
        | Stitches.PropertyValue<"paddingRight">
    ) => {
      return {
        paddingRight: value,
      };
    },
    pb: (
      value:
        | Stitches.ScaleValue<"space">
        | Stitches.PropertyValue<"paddingBottom">
    ) => {
      return {
        paddingBottom: value,
      };
    },
    pl: (
      value:
        | Stitches.ScaleValue<"space">
        | Stitches.PropertyValue<"paddingLeft">
    ) => {
      return {
        paddingLeft: value,
      };
    },
    px: (
      value:
        | Stitches.ScaleValue<"space">
        | Stitches.PropertyValue<"paddingLeft">
    ) => {
      return {
        paddingLeft: value,
        paddingRight: value,
      };
    },
    py: (
      value: Stitches.ScaleValue<"space"> | Stitches.PropertyValue<"paddingTop">
    ) => {
      return {
        paddingTop: value,
        paddingBottom: value,
      };
    },
    m: (
      value: Stitches.ScaleValue<"space"> | Stitches.PropertyValue<"margin">
    ) => {
      return {
        margin: value,
      };
    },
    mt: (
      value: Stitches.ScaleValue<"space"> | Stitches.PropertyValue<"marginTop">
    ) => {
      return {
        marginTop: value,
      };
    },
    mr: (
      value:
        | Stitches.ScaleValue<"space">
        | Stitches.PropertyValue<"marginRight">
    ) => {
      return {
        marginRight: value,
      };
    },
    mb: (
      value:
        | Stitches.ScaleValue<"space">
        | Stitches.PropertyValue<"marginBottom">
    ) => {
      return {
        marginBottom: value,
      };
    },
    ml: (
      value: Stitches.ScaleValue<"space"> | Stitches.PropertyValue<"marginLeft">
    ) => {
      return {
        marginLeft: value,
      };
    },
    mx: (
      value: Stitches.ScaleValue<"space"> | Stitches.PropertyValue<"marginLeft">
    ) => {
      return {
        marginLeft: value,
        marginRight: value,
      };
    },
    my: (
      value: Stitches.ScaleValue<"space"> | Stitches.PropertyValue<"marginTop">
    ) => {
      return {
        marginTop: value,
        marginBottom: value,
      };
    },
    br: (
      value:
        | Stitches.ScaleValue<"radii">
        | Stitches.PropertyValue<"borderRadius">
    ) => {
      return {
        borderRadius: value,
      };
    },
    btrr: (
      value:
        | Stitches.ScaleValue<"radii">
        | Stitches.PropertyValue<"borderTopRightRadius">
    ) => {
      return {
        borderTopRightRadius: value,
      };
    },
    bbrr: (
      value:
        | Stitches.ScaleValue<"radii">
        | Stitches.PropertyValue<"borderBottomRightRadius">
    ) => {
      return {
        borderBottomRightRadius: value,
      };
    },
    bblr: (
      value:
        | Stitches.ScaleValue<"radii">
        | Stitches.PropertyValue<"borderBottomLeftRadius">
    ) => {
      return {
        borderBottomLeftRadius: value,
      };
    },
    btlr: (
      value:
        | Stitches.ScaleValue<"radii">
        | Stitches.PropertyValue<"borderTopLeftRadius">
    ) => {
      return {
        borderTopLeftRadius: value,
      };
    },
    bs: (value: Stitches.PropertyValue<"boxShadow">) => {
      return { boxShadow: value };
    },
    lh: (
      value:
        | Stitches.ScaleValue<"lineHeights">
        | Stitches.PropertyValue<"lineHeight">
    ) => {
      return {
        lineHeight: value,
      };
    },
    size: (
      value: Stitches.ScaleValue<"sizes"> | Stitches.PropertyValue<"width">
    ) => {
      return {
        width: value,
        height: value,
      };
    },
    minColumnWidth: (
      value: Stitches.ScaleValue<"sizes"> | Stitches.PropertyValue<"width">
    ) => {
      return {
        gridTemplateColumns: `repeat(auto-fit, minmax(${value}, 1fr))`,
      };
    },
    appearance: (value: Stitches.PropertyValue<"appearance">) => {
      return {
        WebkitAppearance: value,
        appearance: value,
      };
    },
  },
});

export type CSS = Stitches.CSS<typeof config>;

export const darkTheme = createTheme("dark-theme", {
  colors: {
    ...grayDark,
    ...slateDark,
    ...redDark,
    ...crimsonDark,
    ...pinkDark,
    ...purpleDark,
    ...violetDark,
    ...indigoDark,
    ...blueDark,
    ...skyDark,
    ...mintDark,
    ...cyanDark,
    ...tealDark,
    ...greenDark,
    ...limeDark,
    ...yellowDark,
    ...orangeDark,
    ...bronzeDark,
    ...goldDark,

    ...grayDarkA,
    ...slateDarkA,
    ...redDarkA,
    ...pinkDarkA,
    ...purpleDarkA,
    ...violetDarkA,
    ...indigoDarkA,
    ...blueDarkA,
    ...skyDarkA,
    ...mintDarkA,
    ...cyanDarkA,
    ...tealDarkA,
    ...greenDarkA,
    ...limeDarkA,
    ...yellowDarkA,
    ...orangeDarkA,
    ...bronzeDarkA,
    ...goldDarkA,

    // Semantic colors
    hiContrast: "$slate12",
    loContrast: "$slate1",
    canvas: "hsl(0 0% 15%)",
    panel: "$slate3",
    // panel: "linear-gradient(90deg, $slateA1 100%, $slateA2 100%)",
    transparentPanel: "hsl(0 100% 100% / 97%)",
    shadowLight: "hsl(206 22% 7% / 35%)",
    shadowDark: "hsl(206 22% 7% / 20%)",
  },
});
