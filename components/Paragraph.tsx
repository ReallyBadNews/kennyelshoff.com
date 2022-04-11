import merge from "just-merge";
import { ComponentProps, ElementRef, forwardRef } from "react";
import { CSS, VariantProps } from "stitches.config";
import { Text } from "./Text";

const DEFAULT_TAG = "p";

type TextSizeVariants = Pick<VariantProps<typeof Text>, "size">;
type ParagraphSizeVariants = "0" | "1" | "2" | "3";
type ParagraphVariants = { size?: ParagraphSizeVariants } & Omit<
  VariantProps<typeof Text>,
  "size"
>;

export type ParagraphProps = ComponentProps<typeof DEFAULT_TAG> &
  ParagraphVariants & {
    css?: CSS;
    as?: React.ElementType;
  };

export const Paragraph = forwardRef<
  ElementRef<typeof DEFAULT_TAG>,
  ParagraphProps
>((props, forwardedRef) => {
  // '1' here is the default Paragraph size variant
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
    0: { lineHeight: "$normal" },
    1: { lineHeight: "$relaxed", "@bp1": { lineHeight: "$loose" } },
    2: { lineHeight: "$normal", "@bp1": { lineHeight: "$relaxed" } },
    3: { lineHeight: "$snug", "@bp1": { lineHeight: "$snug" } },
  };
  return (
    <Text
      as={DEFAULT_TAG}
      fontFamily="mono"
      {...textProps}
      ref={forwardedRef}
      css={{
        ...merge(textCss[size], props.css || {}),
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
