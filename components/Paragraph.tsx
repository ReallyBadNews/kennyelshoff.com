import React from "react";
import merge from "lodash.merge";
import { Text } from "./Text";
import { VariantProps, CSS } from "../stitches.config";

const DEFAULT_TAG = "p";

type TextSizeVariants = Pick<VariantProps<typeof Text>, "size">;
type ParagraphSizeVariants = "0" | "1" | "2" | "3";
type ParagraphVariants = { size?: ParagraphSizeVariants } & Omit<
  VariantProps<typeof Text>,
  "size"
>;
type ParagraphProps = React.ComponentProps<typeof DEFAULT_TAG> &
  ParagraphVariants & {
    css?: CSS;
    as?: React.ElementType;
  };

export const Paragraph = React.forwardRef<
  React.ElementRef<typeof DEFAULT_TAG>,
  ParagraphProps
>((props, forwardedRef) => {
  // '2' here is the default Paragraph size variant
  const { size = "1", ...textProps } = props;

  // This is the mapping of Paragraph Variants to Text variants
  const textSize: Record<ParagraphSizeVariants, TextSizeVariants["size"]> = {
    0: { "@initial": "1", "@bp1": "0" },
    1: { "@initial": "1", "@bp1": "3" },
    2: { "@initial": "3", "@bp1": "4" },
    3: { "@initial": "5", "@bp1": "6" },
  };

  // This is the mapping of Paragraph Variants to Text css
  const textCss: Record<ParagraphSizeVariants, CSS> = {
    // TODO: Typography
    0: { lh: "$normal" },
    1: { lh: "$relaxed" },
    2: { lineHeight: "25px", "@bp2": { lineHeight: "27px" } },
    3: {
      color: "$slate11",
      lineHeight: "27px",
      "@bp2": { lineHeight: "30px" },
    },
  };
  return (
    <Text
      as={DEFAULT_TAG}
      fontFamily="mono"
      {...textProps}
      ref={forwardedRef}
      css={{
        ...merge(textCss[size], props.css),
      }}
      size={textSize[size]}
    />
  );
});

Paragraph.displayName = "Paragraph";

Paragraph.defaultProps = {
  as: DEFAULT_TAG,
  css: undefined,
  size: "1",
};
