import { styled } from "stitches.config";

export const List = styled("ul", {
  listStyle: "none",
  "& li": {
    display: "flex",
    "&:before": {
      // content with right arrow glyph
      content: '"\\2192"',
      pr: "$2",
      color: "$blue10",
    },
    "&:not(:first-child)": { mt: "$3" },
  },
});
