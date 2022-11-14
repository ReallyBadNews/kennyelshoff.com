import Image from "@components/Image";
import dynamic from "next/dynamic";
import type { ImageProps } from "next/image";
import { CSS, VariantProps } from "stitches.config";
import { ComponentMap, MDXImages } from "types";
import { Badge } from "./Badge";
import { Blockquote } from "./Blockquote";
import { Box } from "./Box";
import { Code, CodeProps } from "./Code";
import type { GalleryProps } from "./Gallery";
import { Heading } from "./Heading";
import { Kbd } from "./Kbd";
import { List } from "./List";
import NextLink from "./NextLink";
import { Paragraph } from "./Paragraph";
import { Pre } from "./Pre";
import { Preview } from "./Preview";
import { Separator } from "./Separator";

const DynamicGallery = dynamic(async () => {
  const { Gallery } = await import("./Gallery");
  return Gallery;
});

export const MDXComponents = (mdxImages?: MDXImages): ComponentMap => {
  return {
    h1: ({ children }) => {
      return (
        <Heading
          as="h1"
          css={{ "&:not(:first-child)": { mt: "$7", mb: "-$4" } }}
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
          css={{ "&:not(:first-child)": { mt: "$7", mb: "-$3" } }}
          size="3"
          variant="contrast"
        >
          {children}
        </Heading>
      );
    },
    h3: ({ children }) => {
      return (
        <Heading
          as="h3"
          css={{ "&:not(:first-child)": { mt: "$7", mb: "-$3" } }}
          size="2"
          variant="contrast"
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
            css={{
              borderRadius: "$md",
              overflow: "hidden",
              position: "relative",
            }}
          >
            <Image
              alt={alt || "image"}
              {...props}
              placeholder="blur"
              {...mdxImages[src]}
              sizes="(max-width: 640px) calc(100vw - 32px), (max-width: 768px) calc(100vw - 96px), 704px"
            />
          </Box>
        );
      }
      throw new Error(`Image not found: ${src}`);
    },
    Image: ({ src, ...props }: ImageProps) => {
      if (mdxImages && src) {
        return (
          <Box css={{ borderRadius: "$lg", overflow: "hidden" }}>
            <Image
              placeholder="blur"
              {...mdxImages[src as string]}
              {...props}
              sizes="(max-width: 640px) calc(100vw - 32px), (max-width: 768px) calc(100vw - 96px), 704px"
            />
          </Box>
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
      return <List.Item>{children}</List.Item>;
    },
    ul: ({ children }) => {
      return <List type="ul">{children}</List>;
    },
    ol: ({ children }) => {
      return <List type="ol">{children}</List>;
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
    Gallery: ({ children, ...rest }: GalleryProps) => {
      return <DynamicGallery {...rest}>{children}</DynamicGallery>;
    },
  };
};
