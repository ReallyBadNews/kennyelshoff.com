import { styled } from "stitches.config";

export const Blockquote = styled("blockquote", {
  color: "$slate11",
  borderLeft: "$space$1 solid $slate6",
  pl: "$3",
  my: "$6",
  "& p": {
    fontSize: "$2",
    lineHeight: "$snug",
    fontWeight: "$5",
    color: "inherit",
  },
  "@bp1": {
    "& p": { fontSize: "$4" },
  },
});

Blockquote.displayName = "Blockquote";
