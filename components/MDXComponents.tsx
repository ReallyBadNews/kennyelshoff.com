// import Image from "next/image";
import { isExternalLink } from "@lib/utils";
import { ComponentMap } from "mdx-bundler/client";
import { useEffect } from "react";
import { CSS, VariantProps } from "stitches.config";
import Image, { ImageProps } from "next/image";
import { MDXImages } from "types";
import { Blockquote } from "./Blockquote";
import { Box } from "./Box";
import { Code, CodeProps } from "./Code";
import { Heading } from "./Heading";
import { Kbd } from "./Kbd";
import NextLink from "./NextLink";
import { Paragraph } from "./Paragraph";
import { Pre } from "./Pre";
import { Preview } from "./Preview";
import { Separator } from "./Separator";
import { Badge } from "./Badge";
import { Gallery } from "./Gallery";

export const MDXComponents = (mdxImages?: MDXImages): ComponentMap => {
  return {
    h1: ({ children }) => {
      return (
        <Heading
          as="h1"
          css={{ "&:not(:first-child)": { mt: "$6", mb: "-$3" } }}
          size="4"
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
          css={{ "&:not(:first-child)": { mt: "$6", mb: "-$3" } }}
          size="3"
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
          size="2"
          variant="contrast"
          weight="7"
        >
          {children}
        </Heading>
      );
    },
    blockquote: ({ children }) => {
      return <Blockquote>{children}</Blockquote>;
    },
    p: ({ children }) => {
      return (
        <Paragraph size="1" variant="contrast">
          {children}
        </Paragraph>
      );
    },
    strong: ({ children }) => {
      return (
        <Paragraph as="strong" weight="9">
          {children}
        </Paragraph>
      );
    },
    em: ({ children }) => {
      return (
        <Paragraph as="em" css={{ fontStyle: "italic" }}>
          {children}
        </Paragraph>
      );
    },
    a: ({ href, children }) => {
      return (
        <NextLink href={href as string} variant="blue">
          {children}
        </NextLink>
      );
    },
    img: ({ src, alt, ...props }) => {
      if (src && mdxImages) {
        return (
          <Box
            className="mdxImage"
            css={{ borderRadius: "$md", overflow: "hidden" }}
          >
            <Image
              {...props}
              alt={alt}
              layout="responsive"
              placeholder="blur"
              {...mdxImages[src]}
            />
          </Box>
        );
      }
      throw new Error(`Image not found: ${src}`);
    },
    Image: ({ src, ...props }: ImageProps) => {
      if (mdxImages && src) {
        return (
          <Image
            layout="responsive"
            placeholder="blur"
            {...props}
            {...mdxImages[src as string]}
          />
        );
      }
      throw new Error(`Image not found: ${src}`);
    },
    NextLink: ({ href, children, variant, ...rest }) => {
      return (
        <NextLink href={href as string} variant={variant} {...rest}>
          {children}
        </NextLink>
      );
    },
    hr: () => {
      return (
        <Separator
          css={{
            my: "$8",
            width: "calc($sizes$full + $space$5) !important",
            mx: "-$3",
          }}
          size="full"
          asChild
        >
          <hr />
        </Separator>
      );
    },
    li: ({ children }) => {
      return (
        <Paragraph
          as="li"
          css={{
            display: "flex",
            "&:not(:first-child)": { mt: "$3" },
          }}
          size="1"
        >
          <Box css={{ flex: "1 1 0" }}>{children}</Box>
        </Paragraph>
      );
    },
    // TODO: Pseudo element doesn't work
    ul: ({ children }) => {
      return (
        <Box
          as="ul"
          css={{
            // my: "$6",
            pl: "$0",
            color: "$hiContrast",
            fontFamily: "$mono",
            listStyle: "none",
            "& li": {
              display: "flex",
              "&:before": {
                // content with right arrow glyph
                content: '"\\2192"',
                pr: "$2",
                color: "$blue10",
              },
            },
            "& li:not(:first-child)": { mt: "$3" },
          }}
        >
          {children}
        </Box>
      );
    },
    ol: ({ children }) => {
      return (
        <Box
          as="ol"
          css={{
            my: "$6",
            pl: "$3",
            color: "$hiContrast",
            fontFamily: "$mono",
            listStyle: "none",
            "--counterName": "counts",
            counterReset: "var(--counterName)",
            "& li": {
              display: "flex",
              counterIncrement: "var(--counterName)",
              "&:before": {
                pr: "$2",
                color: "$blue10",
                content: 'counters(var(--counterName),".") ". "',
              },
              "&:not(:first-child)": { mt: "$3" },
            },
          }}
        >
          {children}
        </Box>
      );
    },
    pre: ({
      children,
      filename,
      showLineNumbers,
      css,
    }: VariantProps<typeof Pre> & {
      children?: React.ReactNode;
      css?: CSS;
    }) => {
      return (
        <div>
          <Pre
            css={{ ...css }}
            data-filename={filename}
            filename={!!filename}
            showLineNumbers={typeof showLineNumbers === "string"}
          >
            {children}
          </Pre>
        </div>
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
      const isExternal = isExternalLink(href);

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
    Kbd: ({ children }) => {
      return <Kbd>{children}</Kbd>;
    },
    Badge: ({ children, ...rest }) => {
      return (
        <div>
          <Badge {...rest}>{children}</Badge>
        </div>
      );
    },
    Preview,
    Gallery,
  };
};
