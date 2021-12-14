import * as Collapsible from "@radix-ui/react-collapsible";
import React from "react";
import { styled } from "stitches.config";
import { Button } from "./Button";

export interface CodeProps {
  children?: React.ReactNode;
  id?: string;
  collapsible?: string;
  showLineNumbers?: string;
}

export const InlineCode = styled("code", {
  fontFamily: "$jet",
  fontSize: "$2",
  whiteSpace: "nowrap",
  padding: "0 $1 2px $1",

  variants: {
    variant: {
      gray: {
        backgroundColor: "$slate3",
        color: "$slate11",
      },
      violet: {
        backgroundColor: "$violet3",
        color: "$violet11",
      },
    },
  },
  defaultVariants: {
    variant: "gray",
  },
});

export const Code: React.FC<CodeProps> = ({
  children,
  id,
  collapsible,
  showLineNumbers,
  ...rest
}) => {
  const isCollapsible = typeof collapsible !== "undefined";
  const [isOpen, setIsOpen] = React.useState(!isCollapsible);
  const isInline = typeof children === "string";

  const content = isInline ? (
    <InlineCode id={id} {...rest}>
      {children}
    </InlineCode>
  ) : (
    <code id={id} {...rest}>
      {children}
    </code>
  );

  return isCollapsible ? (
    <Collapsible.Root
      defaultOpen={isOpen}
      onOpenChange={(newOpen) => {
        return setIsOpen(newOpen);
      }}
    >
      <Collapsible.Trigger asChild>
        <Button css={{ display: "block", ml: "auto" }}>
          {isOpen ? "Hide" : "Show"}
          {` code`}
        </Button>
      </Collapsible.Trigger>
      <Collapsible.Content>{content}</Collapsible.Content>
    </Collapsible.Root>
  ) : (
    content
  );
};
