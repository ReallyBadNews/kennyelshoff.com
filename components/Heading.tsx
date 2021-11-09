import React from "react";
import merge from "lodash.merge";
import { Text } from "./Text";
import { VariantProps, CSS } from "../stitches.config";

const DEFAULT_TAG = "h1";

type TextSizeVariants = Pick<VariantProps<typeof Text>, "size">;
type HeadingSizeVariants = "1" | "2" | "3" | "4";
type HeadingVariants = { size?: HeadingSizeVariants } & Omit<
  VariantProps<typeof Text>,
  "size"
>;
type HeadingProps = React.ComponentProps<typeof DEFAULT_TAG> &
  HeadingVariants & { css?: CSS; as?: React.ElementType };

export const Heading = React.forwardRef<
  React.ElementRef<typeof DEFAULT_TAG>,
  HeadingProps
>((props, forwardedRef) => {
  // '2' here is the default heading size variant
  const { size = "1", ...textProps } = props;
  // This is the mapping of Heading Variants to Text variants
  const textSize: Record<HeadingSizeVariants, TextSizeVariants["size"]> = {
    1: { "@initial": "4", "@bp2": "5" },
    2: { "@initial": "6", "@bp2": "7" },
    3: { "@initial": "7", "@bp2": "8" },
    4: { "@initial": "8", "@bp2": "9" },
  };

  // This is the mapping of Heading Variants to Text css
  const textCss: Record<HeadingSizeVariants, CSS> = {
    1: { lineHeight: "$normal", "@bp2": { lineHeight: "$none" } },
    2: { lineHeight: "$normal", "@bp2": { lineHeight: "$none" } },
    3: { lineHeight: "$normal", "@bp2": { lineHeight: "$none" } },
    4: { lineHeight: "$normal", "@bp2": { lineHeight: "$none" } },
  };

  return (
    <Text
      as={DEFAULT_TAG}
      {...textProps}
      ref={forwardedRef}
      css={{
        fontVariantNumeric: "proportional-nums",
        ...merge(textCss[size], props.css),
      }}
      size={textSize[size]}
    />
  );
});

Heading.displayName = "Heading";

Heading.defaultProps = {
  as: DEFAULT_TAG,
  css: undefined,
  size: "1",
};
