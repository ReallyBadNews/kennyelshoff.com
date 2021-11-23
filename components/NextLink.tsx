import Link, { LinkProps } from "next/link";
import { FC } from "react";
import { Link as DSLink, LinkProps as DSLinkProps } from "@components/Link";

export type NextLinkProps = LinkProps & DSLinkProps;

/// A unified component for the next/link <Link> and a standard <a> anchor.
/// Will lift href and all other props from Link up to the Link.
/// Will automatically make an <a> tag containing the children and pass it remaining props.
const NextLink: FC<NextLinkProps> = ({
  children,
  href,
  as,
  replace,
  scroll,
  shallow,
  prefetch,
  locale,
  passHref = true,
  ...styleProps
}) => {
  const isExternal = href.startsWith("http");

  if (isExternal) {
    return (
      <DSLink href={href} {...styleProps}>
        {children}
      </DSLink>
    );
  }

  return (
    // These props are lifted up to the `Link` element. All others are passed to the `<a>`
    <Link
      {...{ passHref, href, as, replace, scroll, shallow, prefetch, locale }}
    >
      <DSLink {...styleProps}>{children}</DSLink>
    </Link>
  );
};

export default NextLink;
