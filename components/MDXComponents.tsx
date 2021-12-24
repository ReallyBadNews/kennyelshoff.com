import { useEffect, useRef } from "react";
import { ComponentMap } from "mdx-bundler/client";
import rangeParser from "parse-numeric-range";
import { CSS, VariantProps } from "stitches.config";
import { Box } from "./Box";
import { Code, CodeProps } from "./Code";
import { Heading } from "./Heading";
import { Paragraph } from "./Paragraph";
import { Pre } from "./Pre";
import { Preview } from "./Preview";
import { Kbd } from "./Kbd";

export const MDXComponents: ComponentMap = {
  h1: ({ children }) => {
    return (
      <Heading
        as="h1"
        css={{ "&:not(:first-child)": { mt: "$6", mb: "$3" } }}
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
        css={{ "&:not(:first-child)": { mt: "$6", mb: "$3" } }}
        size="2"
        variant="contrast"
        weight="7"
      >
        {children}
      </Heading>
    );
  },
  h3: ({ children }) => {
    return (
      <Heading
        as="h3"
        css={{ "&:not(:first-child)": { mt: "$6", mb: "$3" } }}
        size="1"
        variant="contrast"
        weight="7"
      >
        {children}
      </Heading>
    );
  },
  blockquote: ({ children }) => {
    return (
      <Box
        as="blockquote"
        css={{
          color: "$slate11",
          borderLeft: "$space$1 solid $slate6",
          pl: "$3",
          my: "$6",
          "& p": {
            color: "inherit",
            fontSize: "$4",
            lineHeight: "$snug",
            fontWeight: "$5",
          },
        }}
      >
        {children}
      </Box>
    );
  },
  p: ({ children }) => {
    return (
      <Paragraph size="1" variant="contrast">
        {children}
      </Paragraph>
    );
  },
  pre: ({
    children,
    variant,
    showLineNumbers,
    css,
  }: VariantProps<typeof Pre> & { children?: React.ReactNode; css?: CSS }) => {
    return (
      <Pre
        css={{ mb: "$6", ...css }}
        showLineNumbers={typeof showLineNumbers === "string"}
        variant={variant}
      >
        {children}
      </Pre>
    );
  },
  code: (props: CodeProps) => {
    return <Code {...props} />;
  },
  // @ts-expect-error - mdx-bundler expects to return a component, not void
  RegisterLink: ({
    id,
    index = 0,
    href,
  }: {
    id: string;
    index: number;
    href: string;
  }) => {
    const isExternal = href.startsWith("http");

    useEffect(() => {
      const codeBlock = document.getElementById(id);
      if (!codeBlock) return undefined;

      const allHighlightWords = codeBlock.querySelectorAll(".highlight-word");
      const target = allHighlightWords[index - 1];
      if (!target) return undefined;

      return target.replaceWith(
        Object.assign(document.createElement("a"), {
          href,
          innerHTML: target.innerHTML,
          className: target.className,
          ...(isExternal ? { target: "_blank", rel: "noopener" } : {}),
        })
      );
    }, [href, id, index, isExternal]);

    return null;
  },
  H: ({ id, index, ...props }) => {
    const triggerRef = useRef<HTMLElement>(null);

    useEffect(() => {
      const { current: trigger } = triggerRef;

      if (trigger) {
        const codeBlock = document.getElementById(id);
        if (!codeBlock) return undefined;

        const allHighlightWords = codeBlock.querySelectorAll(".highlight-word");
        const targetIndex = rangeParser(index).map((i) => {
          return i - 1;
        });

        if (Math.max(...targetIndex) >= allHighlightWords.length) {
          return undefined;
        }

        const addClass = () => {
          return targetIndex.forEach((i) => {
            return allHighlightWords[i].classList.add("on");
          });
        };
        const removeClass = () => {
          return targetIndex.forEach((i) => {
            return allHighlightWords[i].classList.remove("on");
          });
        };

        trigger.addEventListener("mouseenter", addClass);
        trigger.addEventListener("mouseleave", removeClass);

        return () => {
          trigger.removeEventListener("mouseenter", addClass);
          trigger.removeEventListener("mouseleave", removeClass);
        };
      }
      return undefined;
    }, [id, index]);

    return <code ref={triggerRef} {...props} />;
  },
  Preview,
  Kbd: ({ children }) => {
    return <Kbd>{children}</Kbd>;
  },
};
