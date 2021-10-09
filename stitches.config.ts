import { createCss, StitchesCss } from "@stitches/react";
import {
  gray,
  mauve,
  slate,
  sage,
  olive,
  sand,
  tomato,
  red,
  crimson,
  pink,
  plum,
  purple,
  violet,
  indigo,
  blue,
  sky,
  mint,
  cyan,
  teal,
  green,
  grass,
  lime,
  yellow,
  amber,
  orange,
  brown,
  bronze,
  gold,
  grayA,
  mauveA,
  slateA,
  sageA,
  oliveA,
  sandA,
  tomatoA,
  redA,
  crimsonA,
  pinkA,
  plumA,
  purpleA,
  violetA,
  indigoA,
  blueA,
  skyA,
  mintA,
  cyanA,
  tealA,
  greenA,
  grassA,
  limeA,
  yellowA,
  amberA,
  orangeA,
  brownA,
  bronzeA,
  goldA,
  whiteA,
  blackA,
  grayDark,
  mauveDark,
  slateDark,
  sageDark,
  oliveDark,
  sandDark,
  tomatoDark,
  redDark,
  crimsonDark,
  pinkDark,
  plumDark,
  purpleDark,
  violetDark,
  indigoDark,
  blueDark,
  skyDark,
  mintDark,
  cyanDark,
  tealDark,
  greenDark,
  grassDark,
  limeDark,
  yellowDark,
  amberDark,
  orangeDark,
  brownDark,
  bronzeDark,
  goldDark,
  grayDarkA,
  mauveDarkA,
  slateDarkA,
  sageDarkA,
  oliveDarkA,
  sandDarkA,
  tomatoDarkA,
  redDarkA,
  crimsonDarkA,
  pinkDarkA,
  plumDarkA,
  purpleDarkA,
  violetDarkA,
  indigoDarkA,
  blueDarkA,
  skyDarkA,
  mintDarkA,
  cyanDarkA,
  tealDarkA,
  greenDarkA,
  grassDarkA,
  limeDarkA,
  yellowDarkA,
  amberDarkA,
  orangeDarkA,
  brownDarkA,
  bronzeDarkA,
  goldDarkA,
} from "@radix-ui/colors";

export type { StitchesVariants } from "@stitches/react";

const headingFont = [
  "'Inter'",
  "-apple-system",
  "'Seegoee UI'",
  "'Helvetica Neue'",
  "Arial",
  "sans-serif",
].join(", ");

const stitches = createCss({
  theme: {
    colors: {
      ...gray,
      ...mauve,
      ...slate,
      ...sage,
      ...olive,
      ...sand,
      ...tomato,
      ...red,
      ...crimson,
      ...pink,
      ...plum,
      ...purple,
      ...violet,
      ...indigo,
      ...blue,
      ...sky,
      ...mint,
      ...cyan,
      ...teal,
      ...green,
      ...grass,
      ...lime,
      ...yellow,
      ...amber,
      ...orange,
      ...brown,
      ...bronze,
      ...gold,

      ...grayA,
      ...mauveA,
      ...slateA,
      ...sageA,
      ...oliveA,
      ...sandA,
      ...tomatoA,
      ...redA,
      ...crimsonA,
      ...pinkA,
      ...plumA,
      ...purpleA,
      ...violetA,
      ...indigoA,
      ...blueA,
      ...skyA,
      ...mintA,
      ...cyanA,
      ...tealA,
      ...greenA,
      ...grassA,
      ...limeA,
      ...yellowA,
      ...amberA,
      ...orangeA,
      ...brownA,
      ...bronzeA,
      ...goldA,

      ...whiteA,
      ...blackA,

      // Semantic colors
      hiContrast: "$slateA12",
      loContrast: "$slateA1",
      // loContrast: "white",
      canvas: "hsl(0 0% 93%)",
      panel: "white",
      transparentPanel: "hsl(0 0% 0% / 97%)",
      shadowLight: "hsl(206 22% 7% / 35%)",
      shadowDark: "hsl(206 22% 7% / 20%)",
    },
    fonts: {
      inter: headingFont,
      mono: "Plex Mono",
    },
    space: {
      1: "5px",
      2: "10px",
      3: "15px",
      4: "20px",
      5: "25px",
      6: "35px",
      7: "45px",
      8: "65px",
      9: "80px",
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
      6: "600",
      9: "900",
    },
    radii: {
      // 1: "4px",
      // 2: "6px",
      // 3: "8px",
      // 4: "12px",
      // round: "50%",
      // pill: "9999px",
      none: "0",
      sm: "0.125rem",
      rg: "0.25rem",
      md: "0.375rem",
      lg: "0.5rem",
      xl: "1rem",
      full: "9999px",
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
      tight: "1.25",
      snug: "1.375",
      normal: "1.5",
      relaxed: "1.625",
      loose: "2",
    },
    shadows: {},
  },
  media: {
    bp1: "(min-width: 520px)",
    bp2: "(min-width: 900px)",
    bp3: "(min-width: 1200px)",
    bp4: "(min-width: 1800px)",
    motion: "(prefers-reduced-motion)",
    hover: "(any-hover: hover)",
    dark: "(prefers-color-scheme: dark)",
    light: "(prefers-color-scheme: light)",
  },
  utils: {
    stackGap: (config) => {
      return (
        value: `$${keyof typeof config["theme"]["space"]}` | (string & {})
      ) => {
        return {
          $$gap: `$space${value}`,
        };
      };
    },
    bg: (config) => {
      return (
        value: `$${keyof typeof config["theme"]["colors"]}` | (string & {})
      ) => {
        return {
          backgroundColor: value,
        };
      };
    },
    p: (config) => {
      return (
        value: `$${keyof typeof config["theme"]["space"]}` | (string & {})
      ) => {
        return {
          paddingTop: value,
          paddingBottom: value,
          paddingLeft: value,
          paddingRight: value,
        };
      };
    },
    pt: (config) => {
      return (
        value: `$${keyof typeof config["theme"]["space"]}` | (string & {})
      ) => {
        return {
          paddingTop: value,
        };
      };
    },
    pr: (config) => {
      return (
        value: `$${keyof typeof config["theme"]["space"]}` | (string & {})
      ) => {
        return {
          paddingRight: value,
        };
      };
    },
    pb: (config) => {
      return (
        value: `$${keyof typeof config["theme"]["space"]}` | (string & {})
      ) => {
        return {
          paddingBottom: value,
        };
      };
    },
    pl: (config) => {
      return (
        value: `$${keyof typeof config["theme"]["space"]}` | (string & {})
      ) => {
        return {
          paddingLeft: value,
        };
      };
    },
    px: (config) => {
      return (
        value: `$${keyof typeof config["theme"]["space"]}` | (string & {})
      ) => {
        return {
          paddingLeft: value,
          paddingRight: value,
        };
      };
    },
    py: (config) => {
      return (
        value: `$${keyof typeof config["theme"]["space"]}` | (string & {})
      ) => {
        return {
          paddingTop: value,
          paddingBottom: value,
        };
      };
    },
    m: (config) => {
      return (
        value: `$${keyof typeof config["theme"]["space"]}` | (string & {})
      ) => {
        return {
          marginTop: value,
          marginBottom: value,
          marginLeft: value,
          marginRight: value,
        };
      };
    },
    mt: (config) => {
      return (
        value: `$${keyof typeof config["theme"]["space"]}` | (string & {})
      ) => {
        return {
          marginTop: value,
        };
      };
    },
    mr: (config) => {
      return (
        value: `$${keyof typeof config["theme"]["space"]}` | (string & {})
      ) => {
        return {
          marginRight: value,
        };
      };
    },
    mb: (config) => {
      return (
        value: `$${keyof typeof config["theme"]["space"]}` | (string & {})
      ) => {
        return {
          marginBottom: value,
        };
      };
    },
    ml: (config) => {
      return (
        value: `$${keyof typeof config["theme"]["space"]}` | (string & {})
      ) => {
        return {
          marginLeft: value,
        };
      };
    },
    mx: (config) => {
      return (
        value: `$${keyof typeof config["theme"]["space"]}` | (string & {})
      ) => {
        return {
          marginLeft: value,
          marginRight: value,
        };
      };
    },
    my: (config) => {
      return (
        value: `$${keyof typeof config["theme"]["space"]}` | (string & {})
      ) => {
        return {
          marginTop: value,
          marginBottom: value,
        };
      };
    },
    br: (config) => {
      return (
        value: `$${keyof typeof config["theme"]["radii"]}` | (string & {})
      ) => {
        return {
          borderRadius: value,
        };
      };
    },
    btrr: (config) => {
      return (
        value: `$${keyof typeof config["theme"]["radii"]}` | (string & {})
      ) => {
        return {
          borderTopRightRadius: value,
        };
      };
    },
    bbrr: (config) => {
      return (
        value: `$${keyof typeof config["theme"]["radii"]}` | (string & {})
      ) => {
        return {
          borderBottomRightRadius: value,
        };
      };
    },
    bblr: (config) => {
      return (
        value: `$${keyof typeof config["theme"]["radii"]}` | (string & {})
      ) => {
        return {
          borderBottomLeftRadius: value,
        };
      };
    },
    btlr: (config) => {
      return (
        value: `$${keyof typeof config["theme"]["radii"]}` | (string & {})
      ) => {
        return {
          borderTopLeftRadius: value,
        };
      };
    },
    bs: () => {
      return (value: any) => {
        return { boxShadow: value };
      };
    },
    lh: () => {
      return (value: any) => {
        return { lineHeight: value };
      };
    },
    size: (config) => {
      return (
        value: `$${keyof typeof config["theme"]["space"]}` | (string & {})
      ) => {
        return {
          width: value,
          height: value,
        };
      };
    },
    linearGradient: () => {
      return (value: any) => {
        return {
          backgroundImage: `linear-gradient(${value})`,
        };
      };
    },
    appearance: () => {
      return (value) => {
        return {
          WebkitAppearance: value,
          appearance: value,
        };
      };
    },
  },
});

export type CSS = StitchesCss<typeof stitches>;

export const { styled, css, theme, getCssString, global, keyframes, config } =
  stitches;

export const { utils } = config;

export const darkTheme = theme("dark-theme", {
  colors: {
    ...grayDark,
    ...mauveDark,
    ...slateDark,
    ...sageDark,
    ...oliveDark,
    ...sandDark,
    ...tomatoDark,
    ...redDark,
    ...crimsonDark,
    ...pinkDark,
    ...plumDark,
    ...purpleDark,
    ...violetDark,
    ...indigoDark,
    ...blueDark,
    ...skyDark,
    ...mintDark,
    ...cyanDark,
    ...tealDark,
    ...greenDark,
    ...grassDark,
    ...limeDark,
    ...yellowDark,
    ...amberDark,
    ...orangeDark,
    ...brownDark,
    ...bronzeDark,
    ...goldDark,

    ...grayDarkA,
    ...mauveDarkA,
    ...slateDarkA,
    ...sageDarkA,
    ...oliveDarkA,
    ...sandDarkA,
    ...tomatoDarkA,
    ...redDarkA,
    ...crimsonDarkA,
    ...pinkDarkA,
    ...plumDarkA,
    ...purpleDarkA,
    ...violetDarkA,
    ...indigoDarkA,
    ...blueDarkA,
    ...skyDarkA,
    ...mintDarkA,
    ...cyanDarkA,
    ...tealDarkA,
    ...greenDarkA,
    ...grassDarkA,
    ...limeDarkA,
    ...yellowDarkA,
    ...amberDarkA,
    ...orangeDarkA,
    ...brownDarkA,
    ...bronzeDarkA,
    ...goldDarkA,

    // Semantic colors
    hiContrast: "$slateA12",
    loContrast: "$slateA1",
    canvas: "hsl(0 0% 15%)",
    panel: "$slate3",
    transparentPanel: "hsl(0 100% 100% / 97%)",
    shadowLight: "hsl(206 22% 7% / 35%)",
    shadowDark: "hsl(206 22% 7% / 20%)",
  },
});
