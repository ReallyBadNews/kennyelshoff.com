import React from "react";
import type * as Polymorphic from "@radix-ui/react-polymorphic";
import { styled, CSS, StitchesVariants } from "../stitches.config";

const DEFAULT_TAG = "span";

export const StyledText = styled(DEFAULT_TAG, {
  // Reset
  lineHeight: "1",
  margin: "0",
  fontWeight: 400,
  fontFamily: "$mono",
  fontVariantNumeric: "tabular-nums",
  display: "block",

  variants: {
    weight: {
      "1": {
        fontWeight: "$1",
      },
      "4": {
        fontWeight: "$4",
      },
      "6": {
        fontWeight: "$6",
      },
      9: {
        fontWeight: "$9",
      },
    },
    size: {
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
        letterSpacing: "-.015em",
      },
      "6": {
        fontSize: "$6",
        letterSpacing: "-.016em",
      },
      "7": {
        fontSize: "$7",
        letterSpacing: "-.031em",
        textIndent: "-.005em",
      },
      "8": {
        fontSize: "$8",
        letterSpacing: "-.034em",
        textIndent: "-.018em",
      },
      "9": {
        fontSize: "$9",
        letterSpacing: "$wide",
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
    },
    gradient: {
      true: {
        WebkitTextFillColor: "transparent",
      },
    },
  },
  compoundVariants: [
    {
      variant: "red",
      gradient: "true",
      css: {
        background: "linear-gradient(to right, $red11, $crimson11)",
        WebkitBackgroundClip: "text",
      },
    },
    {
      variant: "crimson",
      gradient: "true",
      css: {
        background: "linear-gradient(to right, $crimson11, $pink11)",
        WebkitBackgroundClip: "text",
      },
    },
    {
      variant: "pink",
      gradient: "true",
      css: {
        background: "linear-gradient(to right, $pink11, $purple11)",
        WebkitBackgroundClip: "text",
      },
    },
    {
      variant: "purple",
      gradient: "true",
      css: {
        background: "linear-gradient(to right, $purple11, $violet11)",
        WebkitBackgroundClip: "text",
      },
    },
    {
      variant: "violet",
      gradient: "true",
      css: {
        background: "linear-gradient(to right, $violet11, $indigo11)",
        WebkitBackgroundClip: "text",
      },
    },
    {
      variant: "indigo",
      gradient: "true",
      css: {
        background: "linear-gradient(to right, $indigo11, $blue11)",
        WebkitBackgroundClip: "text",
      },
    },
    {
      variant: "blue",
      gradient: "true",
      css: {
        background: "linear-gradient(to right, $blue11, $cyan11)",
        WebkitBackgroundClip: "text",
      },
    },
    {
      variant: "cyan",
      gradient: "true",
      css: {
        background: "linear-gradient(to right, $cyan11, $teal11)",
        WebkitBackgroundClip: "text",
      },
    },
    {
      variant: "teal",
      gradient: "true",
      css: {
        background: "linear-gradient(to right, $teal11, $green11)",
        WebkitBackgroundClip: "text",
      },
    },
    {
      variant: "green",
      gradient: "true",
      css: {
        background: "linear-gradient(to right, $green11, $lime11)",
        WebkitBackgroundClip: "text",
      },
    },
    {
      variant: "lime",
      gradient: "true",
      css: {
        background: "linear-gradient(to right, $lime11, $yellow11)",
        WebkitBackgroundClip: "text",
      },
    },
    {
      variant: "yellow",
      gradient: "true",
      css: {
        background: "linear-gradient(to right, $yellow11, $orange11)",
        WebkitBackgroundClip: "text",
      },
    },
    {
      variant: "orange",
      gradient: "true",
      css: {
        background: "linear-gradient(to right, $orange11, $red11)",
        WebkitBackgroundClip: "text",
      },
    },
    {
      variant: "gold",
      gradient: "true",
      css: {
        background: "linear-gradient(to right, $gold11, $gold9)",
        WebkitBackgroundClip: "text",
      },
    },
    {
      variant: "bronze",
      gradient: "true",
      css: {
        background: "linear-gradient(to right, $bronze11, $bronze9)",
        WebkitBackgroundClip: "text",
      },
    },
    {
      variant: "gray",
      gradient: "true",
      css: {
        background: "linear-gradient(to right, $gray11, $gray12)",
        WebkitBackgroundClip: "text",
      },
    },
    {
      variant: "contrast",
      gradient: "true",
      css: {
        background: "linear-gradient(to right, $hiContrast, $gray12)",
        WebkitBackgroundClip: "text",
      },
    },
  ],
  defaultVariants: {
    size: "3",
    variant: "contrast",
  },
});

type TextCSSProp = { css?: CSS };
type TextVariants = StitchesVariants<typeof StyledText>;
type TextOwnProps = TextCSSProp & TextVariants;

type TextComponent = Polymorphic.ForwardRefComponent<
  typeof DEFAULT_TAG,
  TextOwnProps
>;

export const Text = React.forwardRef((props, forwardedRef) => {
  return <StyledText {...props} ref={forwardedRef} />;
}) as TextComponent;

Text.toString = () => {
  return `.${StyledText.className}`;
};

Text.displayName = "Text";
