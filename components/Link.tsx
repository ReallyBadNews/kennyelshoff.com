import { styled, VariantProps } from "stitches.config";
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
        "&:before": {
          content: "",
          position: "absolute",
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          outlineWidth: "1px",
          outlineStyle: "solid",
          outlineOffset: "0",
          outlineColor: "$slate4",
          borderRadius: "$lg",
        },
        "&:hover": {
          "&:before": {
            outlineColor: "$slate7",
          },
        },
        "&:focus": {
          outline: "none",
          "&:before": {
            outlineColor: "$slate7",
          },
        },
      },
      hover: {
        "&:before": {
          content: "",
          position: "absolute",
          inset: "-$2 -$3",
          outlineWidth: "1px",
          outlineStyle: "solid",
          outlineOffset: "$space$2",
          outlineColor: "transparent",
          borderRadius: "$sm",
        },
        "&:hover": {
          "&:before": {
            outlineColor: "$slate7",
          },
        },
        "&:focus": {
          "&:before": {
            outlineColor: "$slate7",
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
          outlineColor: "$slate7",
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
          outlineColor: "$slate7",
        },
      },
      transparent: {
        color: "$hiContrast",
        "&:hover": {
          textDecorationLine: "none",
        },
        "&:focus": {
          outline: "none",
        },
      },
      passthru: {
        color: "inherit",
        textDecoration: "none",
        "&:hover": {
          textDecorationLine: "none",
        },
        "&:focus": {
          outline: "none",
        },
      },
    },
  },
  defaultVariants: {
    variant: "contrast",
    outline: undefined,
  },
});
