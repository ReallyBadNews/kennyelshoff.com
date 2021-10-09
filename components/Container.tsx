import React from "react";
import type * as Polymorphic from "@radix-ui/react-polymorphic";
import { styled, CSS, StitchesVariants } from "../stitches.config";

const DEFAULT_TAG = "div";

const StyledContainer = styled(DEFAULT_TAG, {
  // Reset
  boxSizing: "border-box",
  flexShrink: 0,

  // Custom
  ml: "auto",
  mr: "auto",
  px: "$5",

  variants: {
    size: {
      "1": {
        maxWidth: "430px",
      },
      "2": {
        maxWidth: "800px",
      },
      "3": {
        maxWidth: "1145px",
      },
      "4": {
        maxWidth: "none",
      },
    },
  },
  defaultVariants: {
    size: "4",
  },
});

type ContainerCSSProp = { css?: CSS };
type ContainerVariants = StitchesVariants<typeof StyledContainer>;
type ContainerOwnProps = ContainerCSSProp & ContainerVariants;

type ContainerComponent = Polymorphic.ForwardRefComponent<
  typeof DEFAULT_TAG,
  ContainerOwnProps
>;

export const Container = React.forwardRef((props, forwardedRef) => {
  return <StyledContainer {...props} ref={forwardedRef} />;
}) as ContainerComponent;
