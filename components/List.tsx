import { styled } from "stitches.config";

export const List = styled("ul", {
  listStyle: "none",
  pl: "0",
  "& li": {
    display: "flex",
    "&:before": {
      // content with right arrow glyph
      content: '"\\2192"',
      pr: "$3",
      color: "$blue10",
    },
    "&:not(:first-child)": { mt: "$3" },
  },
});
