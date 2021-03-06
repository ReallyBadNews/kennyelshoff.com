import { styled } from "../stitches.config";

export const Container = styled("div", {
  // Reset
  flexShrink: 0,

  // Custom
  ml: "auto",
  mr: "auto",
  px: "$3",

  "@bp1": {
    px: "$7",
  },

  variants: {
    size: {
      "1": {
        maxWidth: "430px",
      },
      "2": {
        maxWidth: "800px",
      },
      "3": {
        maxWidth: "1145px",
      },
      "4": {
        maxWidth: "none",
      },
    },
  },
  defaultVariants: {
    size: "4",
  },
});

Container.displayName = "Container";
