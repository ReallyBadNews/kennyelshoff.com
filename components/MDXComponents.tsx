import { ComponentMap } from "mdx-bundler/client";
import { Heading } from "./Heading";
import { Paragraph } from "./Paragraph";

export const MDXComponents: ComponentMap = {
  h1: ({ children }) => {
    return (
      <Heading
        as="h1"
        css={{ "&:not(:first-child)": { mt: "$6" } }}
        size="3"
        variant="contrast"
        weight="9"
      >
        {children}
      </Heading>
    );
  },
  h2: ({ children }) => {
    return (
      <Heading
        as="h2"
        css={{ "&:not(:first-child)": { mt: "$6" } }}
        size="2"
        variant="contrast"
        weight="7"
      >
        {children}
      </Heading>
    );
  },
  p: ({ children }) => {
    return (
      <Paragraph size="1" variant="contrast">
        {children}
      </Paragraph>
    );
  },
};
