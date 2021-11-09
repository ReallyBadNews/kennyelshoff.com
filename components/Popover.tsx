import React from "react";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import { styled, CSS } from "../stitches.config";
import { Box } from "./Box";
import { panelStyles } from "./Panel";

type PopoverProps = React.ComponentProps<typeof PopoverPrimitive.Root> & {
  children: React.ReactNode;
};

export function Popover({ children, ...props }: PopoverProps) {
  return <PopoverPrimitive.Root {...props}>{children}</PopoverPrimitive.Root>;
}

const StyledContent = styled(PopoverPrimitive.Content, panelStyles, {
  minWidth: 200,
  minHeight: "$6",
  maxWidth: 265,
  "&:focus": {
    outline: "none",
  },
});

type PopoverContentPrimitiveProps = React.ComponentProps<
  typeof PopoverPrimitive.Content
>;

type PopoverContentProps = PopoverContentPrimitiveProps & {
  css?: CSS;
  hideArrow?: boolean;
};

export const PopoverContent = React.forwardRef<
  React.ElementRef<typeof StyledContent>,
  PopoverContentProps
>(({ children, hideArrow = true, ...props }, fowardedRef) => {
  return (
    <StyledContent sideOffset={0} {...props} ref={fowardedRef}>
      {children}
      {!hideArrow && (
        <Box css={{ color: "$panel" }}>
          <PopoverPrimitive.Arrow
            height={5}
            offset={5}
            style={{ fill: "currentColor" }}
            width={11}
          />
        </Box>
      )}
    </StyledContent>
  );
});

PopoverContent.defaultProps = {
  css: undefined,
  hideArrow: true,
};

PopoverContent.displayName = "PopoverContent";

export const PopoverTrigger = PopoverPrimitive.Trigger;
export const PopoverClose = PopoverPrimitive.Close;
