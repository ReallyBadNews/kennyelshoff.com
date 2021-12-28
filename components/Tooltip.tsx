import { ComponentProps, ReactElement, ReactNode } from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { styled } from "../stitches.config";
import { Box } from "./Box";
import { Text } from "./Text";

type TooltipProps = ComponentProps<typeof TooltipPrimitive.Root> &
  ComponentProps<typeof TooltipPrimitive.Content> & {
    children: ReactElement;
    content: ReactNode;
    multiline?: boolean;
  };

const Content = styled(TooltipPrimitive.Content, {
  backgroundColor: "$transparentPanel",
  borderRadius: "$sm",
  padding: "$1 $2",

  variants: {
    multiline: {
      true: {
        maxWidth: 250,
        pb: 7,
      },
    },
  },
});

export function Tooltip({
  children,
  content,
  open,
  defaultOpen,
  onOpenChange,
  multiline,
  ...props
}: TooltipProps) {
  return (
    <TooltipPrimitive.Root
      defaultOpen={defaultOpen}
      open={open}
      onOpenChange={onOpenChange}
    >
      <TooltipPrimitive.Trigger asChild>{children}</TooltipPrimitive.Trigger>
      <Content
        align="center"
        side="top"
        sideOffset={5}
        {...props}
        multiline={multiline}
      >
        <Text
          as="p"
          css={{
            color: "$loContrast",
            lineHeight: multiline ? "20px" : undefined,
          }}
          size="0"
        >
          {content}
        </Text>
        <Box css={{ color: "$transparentExtreme" }}>
          <TooltipPrimitive.Arrow
            height={5}
            offset={5}
            style={{
              fill: "currentColor",
            }}
            width={11}
          />
        </Box>
      </Content>
    </TooltipPrimitive.Root>
  );
}

Tooltip.defaultProps = {
  multiline: false,
};
