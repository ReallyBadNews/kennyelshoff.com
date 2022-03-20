import { styled, childWithGap } from "../stitches.config";

export const Stack = styled("div", {
  display: "flex",
  $$gap: "initial",
  variants: {
    direction: {
      column: {
        flexDirection: "column",
        [childWithGap]: { margin: "$$gap 0 0 0" },
      },
      row: {
        flexDirection: "row",
        [childWithGap]: { margin: "0 0 0 $$gap" },
      },
      "row-reverse": {
        flexDirection: "row-reverse",
        [childWithGap]: { margin: "0 $$gap 0 0" },
      },
      "column-reverse": {
        flexDirection: "column-reverse",
        [childWithGap]: { margin: "0 0 $$gap 0" },
      },
    },
    marginCollapse: {
      true: {
        display: "block",
      },
    },
  },
  defaultVariants: {
    direction: "column",
  },
});

Stack.displayName = "Stack";
