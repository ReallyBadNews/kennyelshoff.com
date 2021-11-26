import * as SeparatorPrimitive from "@radix-ui/react-separator";
import { styled } from "../stitches.config";

export const Separator = styled(SeparatorPrimitive.Root, {
  border: "none",
  margin: 0,
  flexShrink: 0,
  backgroundColor: "$slate6",
  cursor: "default",

  variants: {
    size: {
      "1": {
        '&[data-orientation="horizontal"]': {
          height: "1px",
          width: "$3",
        },

        '&[data-orientation="vertical"]': {
          width: "1px",
          height: "$3",
        },
      },
      "2": {
        '&[data-orientation="horizontal"]': {
          height: "1px",
          width: "$12",
        },

        '&[data-orientation="vertical"]': {
          width: "1px",
          height: "$12",
        },
      },
      full: {
        '&[data-orientation="horizontal"]': {
          height: "1px",
          width: "$full",
        },

        '&[data-orientation="vertical"]': {
          width: "1px",
          height: "$full",
        },
      },
    },
  },
  defaultVariants: {
    size: "1",
  },
});

Separator.displayName = "Separator";
