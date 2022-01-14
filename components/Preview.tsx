import { CSS } from "stitches.config";
import { Box } from "./Box";

export const Preview = ({ css, ...props }: { css: CSS }) => {
  return (
    <Box
      {...props}
      css={{
        backgroundColor: "$slate3",
        position: "relative",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        py: "$9",
        borderRadius: "$lg $lg 0 0",
        ...css,
      }}
      data-preview
    />
  );
};
