import * as Collapsible from "@radix-ui/react-collapsible";
import React from "react";
import { Button } from "./Button";

export interface CodeProps {
  children?: React.ReactNode;
  id?: string;
  collapsible?: string;
  showLineNumbers?: string;
}

export const Code: React.FC<CodeProps> = ({
  children,
  id,
  collapsible,
  showLineNumbers,
  ...rest
}) => {
  const isCollapsible = typeof collapsible !== "undefined";
  const [isOpen, setIsOpen] = React.useState(!isCollapsible);
  const content = (
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
