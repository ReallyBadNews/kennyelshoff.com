import NextImage from "next/image";
import { styled } from "../stitches.config";

export const Image = styled(NextImage, {
  // Reset
  verticalAlign: "middle",
  maxWidth: "100%",
});
