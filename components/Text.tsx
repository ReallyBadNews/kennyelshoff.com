import { styled } from "../stitches.config";

export const Text = styled("span", {
  // Reset
  lineHeight: "1",
  margin: "0",
  fontWeight: 400,
  fontVariantNumeric: "tabular-nums",

  variants: {
    weight: {
      "1": {
        fontWeight: "$1",
      },
      "4": {
        fontWeight: "$4",
      },
      "5": {
        fontWeight: "$5",
      },
      "6": {
        fontWeight: "$6",
      },
      "7": {
        fontWeight: "$7",
      },
      9: {
        fontWeight: "$9",
      },
    },
    fontFamily: {
      sans: {
        fontFamily: "$inter",
      },
      mono: {
        fontFamily: "$mono",
      },
      jet: {
        fontFamily: "$jet",
      },
    },
    size: {
      "0": {
        fontSize: "$0",
      },
      "1": {
        fontSize: "$1",
      },
      "2": {
        fontSize: "$2",
      },
      "3": {
        fontSize: "$3",
      },
      "4": {
        fontSize: "$4",
      },
      "5": {
        fontSize: "$5",
      },
      "6": {
        fontSize: "$6",
      },
      "7": {
        fontSize: "$7",
        textIndent: "-.005em",
      },
      "8": {
        fontSize: "$8",
        textIndent: "-.018em",
      },
      "9": {
        fontSize: "$9",
        textIndent: "-.025em",
      },
    },
    variant: {
      red: {
        color: "$red11",
      },
      crimson: {
        color: "$crimson11",
      },
      pink: {
        color: "$pink11",
      },
      purple: {
        color: "$purple11",
      },
      violet: {
        color: "$violet11",
      },
      indigo: {
        color: "$indigo11",
      },
      blue: {
        color: "$blue11",
      },
      sky: {
        color: "$sky11",
      },
      cyan: {
        color: "$cyan11",
      },
      teal: {
        color: "$teal11",
      },
      green: {
        color: "$green11",
      },
      lime: {
        color: "$lime11",
      },
      yellow: {
        color: "$yellow11",
      },
      orange: {
        color: "$orange11",
      },
      gold: {
        color: "$gold11",
      },
      bronze: {
        color: "$bronze11",
      },
      gray: {
        color: "$slate11",
      },
      contrast: {
        color: "$hiContrast",
      },
      subtle: {
        color: "$slate11",
      },
    },
    gradient: {
      true: {
        "-webkit-text-fill-color": "transparent",
        "-moz-text-fill-color": "transparent",
      },
    },
  },
  compoundVariants: [
    {
      variant: "red",
      gradient: true,
      css: {
        background: "linear-gradient(to right, $red11, $crimson11)",
        WebkitBackgroundClip: "text",
        "--moz-background-clip": "text",
      },
    },
    {
      variant: "crimson",
      gradient: "true",
      css: {
        background: "linear-gradient(to right, $crimson11, $pink11)",
        WebkitBackgroundClip: "text",
        "--moz-background-clip": "text",
      },
    },
    {
      variant: "pink",
      gradient: "true",
      css: {
        background: "linear-gradient(to right, $pink11, $purple11)",
        WebkitBackgroundClip: "text",
        "--moz-background-clip": "text",
      },
    },
    {
      variant: "purple",
      gradient: "true",
      css: {
        background: "linear-gradient(to right, $purple11, $violet11)",
        WebkitBackgroundClip: "text",
        "--moz-background-clip": "text",
      },
    },
    {
      variant: "violet",
      gradient: "true",
      css: {
        background: "linear-gradient(to right, $violet11, $indigo11)",
        WebkitBackgroundClip: "text",
        "--moz-background-clip": "text",
      },
    },
    {
      variant: "indigo",
      gradient: "true",
      css: {
        background: "linear-gradient(to right, $indigo11, $blue11)",
        WebkitBackgroundClip: "text",
        "--moz-background-clip": "text",
      },
    },
    {
      variant: "blue",
      gradient: "true",
      css: {
        background: "linear-gradient(to right, $blue11, $cyan11)",
        WebkitBackgroundClip: "text",
        "--moz-background-clip": "text",
      },
    },
    {
      variant: "sky",
      gradient: "true",
      css: {
        background: "linear-gradient(to right, $sky11, $mint11)",
        WebkitBackgroundClip: "text",
        "--moz-background-clip": "text",
      },
    },
    {
      variant: "cyan",
      gradient: "true",
      css: {
        background: "linear-gradient(to right, $cyan11, $teal11)",
        WebkitBackgroundClip: "text",
        "--moz-background-clip": "text",
      },
    },
    {
      variant: "teal",
      gradient: "true",
      css: {
        background: "linear-gradient(to right, $teal11, $green11)",
        WebkitBackgroundClip: "text",
        "--moz-background-clip": "text",
      },
    },
    {
      variant: "green",
      gradient: "true",
      css: {
        background: "linear-gradient(to right, $green11, $lime11)",
        WebkitBackgroundClip: "text",
        "--moz-background-clip": "text",
      },
    },
    {
      variant: "lime",
      gradient: "true",
      css: {
        background: "linear-gradient(to right, $lime11, $yellow11)",
        WebkitBackgroundClip: "text",
        "--moz-background-clip": "text",
      },
    },
    {
      variant: "yellow",
      gradient: "true",
      css: {
        background: "linear-gradient(to right, $yellow11, $orange11)",
        WebkitBackgroundClip: "text",
        "--moz-background-clip": "text",
      },
    },
    {
      variant: "orange",
      gradient: "true",
      css: {
        background: "linear-gradient(to right, $orange11, $red11)",
        WebkitBackgroundClip: "text",
        "--moz-background-clip": "text",
      },
    },
    {
      variant: "gold",
      gradient: "true",
      css: {
        background: "linear-gradient(to right, $gold11, $gold9)",
        WebkitBackgroundClip: "text",
        "--moz-background-clip": "text",
      },
    },
    {
      variant: "bronze",
      gradient: "true",
      css: {
        background: "linear-gradient(to right, $bronze11, $bronze9)",
        WebkitBackgroundClip: "text",
        "--moz-background-clip": "text",
      },
    },
    {
      variant: "gray",
      gradient: "true",
      css: {
        background: "linear-gradient(to right, $gray11, $gray12)",
        WebkitBackgroundClip: "text",
        "--moz-background-clip": "text",
      },
    },
    {
      variant: "contrast",
      gradient: "true",
      css: {
        background: "linear-gradient(to right, $hiContrast, $gray12)",
        WebkitBackgroundClip: "text",
        "--moz-background-clip": "text",
      },
    },
  ],
  defaultVariants: {
    size: "3",
    variant: "contrast",
  },
});

Text.displayName = "Text";
