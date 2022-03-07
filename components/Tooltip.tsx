import { ComponentProps, FC, ReactElement, ReactNode } from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { styled, keyframes } from "stitches.config";
import { Box } from "./Box";
import { Text } from "./Text";

type TooltipProps = ComponentProps<typeof TooltipPrimitive.Root> &
  ComponentProps<typeof TooltipPrimitive.Content> & {
    children: ReactElement;
    content: ReactNode;
    multiline?: boolean;
  };

const scaleIn = keyframes({
  "0%": { opacity: 0, transform: "scale(0.5)" },
  "100%": { opacity: 1, transform: "scale(1)" },
});

const TooltipContent = styled(TooltipPrimitive.Content, {
  fontSize: "$0",
  color: "$hiContrast",
  backgroundColor: "$transparentPanel",
  borderRadius: "$rg",
  padding: "$1 $2",
  transformOrigin: "var(--radix-tooltip-content-transform-origin)",
  animation: `${scaleIn} 320ms cubic-bezier(0.16, 1, 0.3, 1)`,

  variants: {
    multiline: {
      true: {
        maxWidth: 250,
        pb: "$5",
      },
    },
  },
});

export const TooltipProvider: FC<TooltipPrimitive.TooltipProviderProps> = ({
  children,
  delayDuration = 500,
  skipDelayDuration = 300,
}) => {
  return (
    <TooltipPrimitive.Provider
      delayDuration={delayDuration}
      skipDelayDuration={skipDelayDuration}
    >
      {children}
    </TooltipPrimitive.Provider>
  );
};

export function Tooltip({
  children,
  content,
  open,
  defaultOpen,
  onOpenChange,
  multiline = false,
  delayDuration,
  ...props
}: TooltipProps) {
  return (
    <TooltipPrimitive.Root
      defaultOpen={defaultOpen}
      delayDuration={delayDuration}
      open={open}
      onOpenChange={onOpenChange}
    >
      <TooltipPrimitive.Trigger asChild>{children}</TooltipPrimitive.Trigger>
      <TooltipContent
        align="center"
        side="top"
        sideOffset={4}
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
      </TooltipContent>
    </TooltipPrimitive.Root>
  );
}

Tooltip.defaultProps = {
  multiline: false,
};
