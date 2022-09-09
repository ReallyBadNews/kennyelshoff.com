import React, { forwardRef } from "react";
import { CheckIcon } from "@radix-ui/react-icons";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { styled, css, CSS } from "../stitches.config";
// import { menuCss, separatorCss, itemCss, labelCss } from "./Menu";
import { Box } from "./Box";
import { Flex } from "./Flex";
import { panelStyles } from "./Panel";

export const baseItemCss = css({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  fontFamily: "$inter",
  fontSize: "$1",
  fontVariantNumeric: "tabular-nums",
  lineHeight: "1",
  cursor: "default",
  userSelect: "none",
  whiteSpace: "nowrap",
  p: "$1 0 $1 $4",
  // py: "$1",
  // px: "$5",
});

export const itemCss = css(baseItemCss, {
  position: "relative",
  color: "$hiContrast",
  borderRadius: "$rg",

  "&:focus": {
    outline: "none",
    backgroundColor: "$blue9",
    color: "white",
  },

  "&[data-disabled]": {
    color: "$slate9",
  },
});

export const labelCss = css(baseItemCss, {
  fontSize: "$0",
  color: "$slate11",
});

export const menuCss = css({
  boxSizing: "border-box",
  minWidth: "$48",
  p: "$2",
});

export const separatorCss = css({
  height: 1,
  my: "$1",
  backgroundColor: "$slate6",
});

export const DropdownMenu = DropdownMenuPrimitive.Root;
export const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;
export const StyledContent = styled(
  DropdownMenuPrimitive.Content,
  menuCss,
  panelStyles
);

type DropdownMenuContentPrimitiveProps = React.ComponentProps<
  typeof DropdownMenuPrimitive.Content
>;

type DropdownMenuContentProps = DropdownMenuContentPrimitiveProps & {
  css?: CSS;
};

export const DropdownMenuContent = forwardRef<
  React.ElementRef<typeof StyledContent>,
  DropdownMenuContentProps
>((props, forwardedRef) => {
  return (
    <DropdownMenuPrimitive.Portal>
      <StyledContent {...props} ref={forwardedRef} />
    </DropdownMenuPrimitive.Portal>
  );
});

DropdownMenuContent.displayName = "DropdownMenuContent";

export const DropdownMenuLabel = styled(DropdownMenuPrimitive.Label, labelCss);
export const DropdownMenuItem = styled(DropdownMenuPrimitive.Item, itemCss);
export const DropdownMenuRadioGroup = styled(
  DropdownMenuPrimitive.RadioGroup,
  {}
);
export const DropdownMenuGroup = styled(DropdownMenuPrimitive.Group, {
  py: "$1",
});

export const DropdownMenuSeparator = styled(
  DropdownMenuPrimitive.Separator,
  separatorCss
);

export const DropdownMenuArrow = styled(DropdownMenuPrimitive.Arrow, {
  fill: "$panel",
});

const StyledDropdownMenuRadioItem = styled(
  DropdownMenuPrimitive.RadioItem,
  itemCss
);

type DialogMenuRadioItemPrimitiveProps = React.ComponentProps<
  typeof DropdownMenuPrimitive.RadioItem
>;
type DialogMenuRadioItemProps = DialogMenuRadioItemPrimitiveProps & {
  css?: CSS;
};

export const DropdownMenuRadioItem = React.forwardRef<
  React.ElementRef<typeof StyledDropdownMenuRadioItem>,
  DialogMenuRadioItemProps
>(({ children, ...props }, forwardedRef) => {
  return (
    <StyledDropdownMenuRadioItem {...props} ref={forwardedRef}>
      <Box as="span" css={{ position: "absolute", left: "$1" }}>
        <DropdownMenuPrimitive.ItemIndicator>
          <Flex
            css={{
              width: "$4",
              height: "$4",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Box
              css={{
                width: "$1",
                height: "$1",
                backgroundColor: "currentColor",
                borderRadius: "$round",
              }}
            />
          </Flex>
        </DropdownMenuPrimitive.ItemIndicator>
      </Box>
      {children}
    </StyledDropdownMenuRadioItem>
  );
});

DropdownMenuRadioItem.displayName = "DropdownMenuRadioItem";

const StyledDropdownMenuCheckboxItem = styled(
  DropdownMenuPrimitive.CheckboxItem,
  itemCss
);

type DialogMenuCheckboxItemPrimitiveProps = React.ComponentProps<
  typeof DropdownMenuPrimitive.CheckboxItem
>;

type DialogMenuCheckboxItemProps = DialogMenuCheckboxItemPrimitiveProps & {
  css?: CSS;
};

export const DropdownMenuCheckboxItem = React.forwardRef<
  React.ElementRef<typeof StyledDropdownMenuCheckboxItem>,
  DialogMenuCheckboxItemProps
>(({ children, ...props }, forwardedRef) => {
  return (
    <StyledDropdownMenuCheckboxItem {...props} ref={forwardedRef}>
      <Box as="span" css={{ position: "absolute", left: "$1" }}>
        <DropdownMenuPrimitive.ItemIndicator>
          <CheckIcon />
        </DropdownMenuPrimitive.ItemIndicator>
      </Box>
      {children}
    </StyledDropdownMenuCheckboxItem>
  );
});

DropdownMenuCheckboxItem.displayName = "DropdownMenuCheckboxItem";
