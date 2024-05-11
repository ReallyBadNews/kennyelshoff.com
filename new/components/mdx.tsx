import Link, { LinkProps } from "next/link";
import Image, { ImageProps } from "next/image";
import { MDXRemote, MDXRemoteProps } from "next-mdx-remote/rsc";
import { highlight } from "sugar-high";
import React, { ComponentProps, ReactNode } from "react";
import { UrlObject } from "url";

interface TableProps {
  data?: {
    headers: string[];
    rows: string[][];
  };
}

function Table({ data }: TableProps) {
  if (!data) return null;
  let headers = data.headers.map((header, index) => (
    <th key={index}>{header}</th>
  ));
  let rows = data.rows.map((row, index) => (
    <tr key={index}>
      {row.map((cell, cellIndex) => (
        <td key={cellIndex}>{cell}</td>
      ))}
    </tr>
  ));

  return (
    <table>
      <thead>
        <tr>{headers}</tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}

interface CustomLinkProps extends Omit<LinkProps, "href"> {
  children?: ReactNode;
  href?: LinkProps["href"];
}

function CustomLink({ href, children, ...rest }: CustomLinkProps) {
  if (!href) return null;

  // Convert href to string once and use it throughout for efficiency and clarity
  const hrefString = href.toString();

  // Handle internal links
  if (hrefString.startsWith("/")) {
    return (
      <Link href={href} {...rest}>
        {children}
      </Link>
    );
  }

  // Handle hash navigation within the same page
  if (hrefString.startsWith("#")) {
    return (
      <a href={hrefString} {...rest}>
        {children}
      </a>
    ); // Add href and children to <a> tag
  }

  // Handle external links
  if (hrefString.startsWith("http") || hrefString.startsWith("https")) {
    return (
      <a href={hrefString} target="_blank" rel="noopener noreferrer" {...rest}>
        {children}
      </a>
    );
  }

  // Optionally, handle unexpected cases or log an error
  console.error("Invalid href provided to CustomLink: ", href);
  return null;
}

function RoundedImage(props: ImageProps) {
  return <Image className="rounded-lg" {...props} />;
}

interface CodeProps extends ComponentProps<"code"> {
  children?: ReactNode;
}

function Pre({ children }: { children?: ReactNode }) {
  return (
    <pre className="bg-primary-foreground text-white rounded-lg">
      {children}
    </pre>
  );
}

function Code({ children, ...props }: CodeProps) {
  if (!children) return null;
  let codeHTML = highlight(children as string);
  return <code dangerouslySetInnerHTML={{ __html: codeHTML }} {...props} />;
}

function slugify(str: ReactNode) {
  if (!str) return "";
  return str
    .toString()
    .toLowerCase()
    .trim() // Remove whitespace from both ends of a string
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/&/g, "-and-") // Replace & with 'and'
    .replace(/[^\w\-]+/g, "") // Remove all non-word characters except for -
    .replace(/\-\-+/g, "-"); // Replace multiple - with single -
}

function createHeading(level: number) {
  const Heading = ({ children }: { children?: ReactNode }) => {
    let slug = slugify(children);
    return React.createElement(
      `h${level}`,
      { id: slug },
      [
        React.createElement("a", {
          href: `#${slug}`,
          key: `link-${slug}`,
          className: "anchor",
        }),
      ],
      children,
    );
  };

  Heading.displayName = `Heading${level}`;

  return Heading;
}

const components: MDXRemoteProps["components"] = {
  h1: createHeading(1),
  h2: createHeading(2),
  h3: createHeading(3),
  h4: createHeading(4),
  h5: createHeading(5),
  h6: createHeading(6),
  Image: RoundedImage,
  a: CustomLink,
  pre: Pre,
  code: Code,
  Table,
  Gallery: () => (
    <div className="bg-destructive text-destructive-foreground p-3 flex justify-center items-center aspect-video rounded-lg">
      Gallery not implemented
    </div>
  ), // not implemented yet
};

export function CustomMDX(props: MDXRemoteProps) {
  return (
    <MDXRemote
      {...props}
      components={{ ...components, ...(props.components || {}) }}
    />
  );
}
