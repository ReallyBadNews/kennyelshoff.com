import { styled, VariantProps } from "../stitches.config";
import { Text } from "./Text";

export type LinkProps = React.ComponentProps<typeof Link> &
  VariantProps<typeof Link>;

export const Link = styled("a", {
  alignItems: "center",
  gap: "$1",
  flexShrink: 0,
  fontWeight: "$6",
  outline: "none",
  textDecorationLine: "none",
  textUnderlineOffset: "3px",
  textDecorationColor: "$slate4",
  WebkitTapHighlightColor: "rgba(0,0,0,0)",
  lineHeight: "inherit",
  "&:hover": {
    textDecorationLine: "underline",
  },
  "&:focus": {
    outlineWidth: "2px",
    outlineStyle: "solid",
    outlineOffset: "2px",
    textDecorationLine: "none",
    borderRadius: "$sm",
  },
  [`& ${Text}`]: {
    color: "inherit",
  },

  variants: {
    outline: {
      always: {
        "&:after": {
          content: "",
          position: "absolute",
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          border: "1px solid $slateA3",
          borderRadius: "$rg",
        },
        "&:hover": {
          textDecorationColor: "$slate7",
          "&:after": {
            border: "2px solid $slateA5",
          },
        },
        "&:focus": {
          outline: "none",
          "&:after": {
            border: "2px solid $slateA7",
            borderRadius: "$rg",
          },
        },
      },
      hover: {
        "&:after": {
          content: "",
          position: "absolute",
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          border: "1px solid $transparent",
          borderRadius: "$rg",
        },
        "&:hover": {
          textDecorationColor: "$slate7",
          "&:after": {
            border: "2px solid $slateA5",
          },
        },
        "&:focus": {
          outline: "none",
          "&:after": {
            border: "2px solid $slateA7",
            borderRadius: "$rg",
          },
        },
      },
    },
    variant: {
      blue: {
        color: "$blue11",
        textDecorationColor: "$blue4",
        "&:focus": {
          outlineColor: "$blue8",
        },
      },
      subtle: {
        color: "$slate11",
        textDecorationColor: "$slate4",
        "&:focus": {
          outlineColor: "$slate8",
        },
      },
      contrast: {
        color: "$hiContrast",
        textDecoration: "underline",
        textDecorationColor: "$slate4",
        "&:hover": {
          textDecorationColor: "$slate7",
        },
        "&:focus": {
          outlineColor: "$slate8",
        },
      },
      transparent: {
        color: "inherit",
      },
    },
  },
  // compoundVariants: [
  //   {
  //     outline: "none",
  //     variant: "transparent",
  //     css: {},
  //   },
  // ],
  defaultVariants: {
    variant: "contrast",
    outline: undefined,
  },
});
