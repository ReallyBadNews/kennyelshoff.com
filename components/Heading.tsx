import { ComponentProps, ElementType, ElementRef, forwardRef } from "react";
import merge from "just-merge";
import { VariantProps, CSS } from "stitches.config";
import { Text } from "./Text";

const DEFAULT_TAG = "h1";

type TextSizeVariants = Pick<VariantProps<typeof Text>, "size">;
type HeadingSizeVariants = "1" | "2" | "3" | "4" | "5";
type HeadingVariants = { size?: HeadingSizeVariants } & Omit<
  VariantProps<typeof Text>,
  "size"
>;
type HeadingProps = ComponentProps<typeof DEFAULT_TAG> &
  HeadingVariants & { css?: CSS; as?: ElementType };

export const Heading = forwardRef<ElementRef<typeof DEFAULT_TAG>, HeadingProps>(
  (
    { size = "1", variant = "contrast", weight = "7", css, ...textProps },
    forwardedRef
  ) => {
    // This is the mapping of Heading Variants to Text variants
    const textSize: Record<HeadingSizeVariants, TextSizeVariants["size"]> = {
      1: { "@initial": "1", "@bp1": "3" },
      2: { "@initial": "2", "@bp1": "4" },
      3: { "@initial": "3", "@bp1": "5" },
      4: { "@initial": "4", "@bp1": "6" },
      5: { "@initial": "5", "@bp1": "7" },
    };

    // This is the mapping of Heading Variants to Text css
    const textCss: Record<HeadingSizeVariants, CSS> = {
      1: { lineHeight: "$normal", "@bp1": { lineHeight: "$normal" } },
      2: { lineHeight: "$normal", "@bp1": { lineHeight: "$normal" } },
      3: { lineHeight: "$normal", "@bp1": { lineHeight: "$normal" } },
      4: { lineHeight: "$normal", "@bp1": { lineHeight: "$tight" } },
      5: { lineHeight: "$normal", "@bp1": { lineHeight: "$normal" } },
    };

    return (
      <Text
        as={DEFAULT_TAG}
        variant={variant}
        weight={weight}
        {...textProps}
        ref={forwardedRef}
        css={{
          fontVariantNumeric: "proportional-nums",
          ...merge(textCss[size], css || {}),
        }}
        size={textSize[size]}
      />
    );
  }
);

Heading.displayName = "Heading";

Heading.defaultProps = {
  as: DEFAULT_TAG,
  css: undefined,
  size: "3",
};
