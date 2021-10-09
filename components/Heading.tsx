import React from "react";
import merge from "lodash.merge";
import * as Polymorphic from "@radix-ui/react-polymorphic";
import { StyledText } from "./Text";
import { StitchesVariants, CSS } from "../stitches.config";

const DEFAULT_TAG = "h1";

type TextSizeVariants = Pick<StitchesVariants<typeof StyledText>, "size">;

type HeadingCSSProp = { css?: CSS };
type HeadingSizeVariants = "1" | "2" | "3" | "4";
type HeadingVariants = { size?: HeadingSizeVariants } & Omit<
  StitchesVariants<typeof StyledText>,
  "size"
>;
type HeadingOwnProps = HeadingCSSProp & HeadingVariants;
type HeadingComponent = Polymorphic.ForwardRefComponent<
  typeof DEFAULT_TAG,
  HeadingOwnProps
>;

export const Heading = React.forwardRef((props, forwardedRef) => {
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
    <StyledText
      as={DEFAULT_TAG}
      {...textProps}
      ref={forwardedRef}
      css={{
        fontFamily: "$inter",
        fontVariantNumeric: "proportional-nums",
        ...(merge(textCss[size], props.css) as any),
      }}
      size={textSize[size]}
    />
  );
}) as HeadingComponent;
