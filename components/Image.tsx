import NextImage from "next/legacy/image";
import { styled } from "stitches.config";

export const Image = styled(NextImage, {
  // Reset
  verticalAlign: "middle",
  maxWidth: "100%",
});

Image.displayName = "StyledImage";
