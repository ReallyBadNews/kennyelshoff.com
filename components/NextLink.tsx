import Link, { LinkProps } from "next/link";
import { FC } from "react";
import { Link as DSLink, LinkProps as DSLinkProps } from "@components/Link";
import { getHostname, isExternalLink } from "@lib/utils";
import { Stack } from "./Stack";
import { Text } from "./Text";

export type NextLinkProps = LinkProps &
  DSLinkProps & { showCitation?: boolean };

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
  showCitation = false,
  ...styleProps
}) => {
  const isExternal = isExternalLink(href);

  if (isExternal) {
    if (showCitation) {
      return (
        <Stack css={{ stackGap: "$1" }}>
          <span>
            <DSLink href={href} {...styleProps}>
              {children}
            </DSLink>
          </span>
          {showCitation && (
            <Text as="cite" fontFamily="jet" size="0" variant="subtle">
              {getHostname(href)}
            </Text>
          )}
        </Stack>
      );
    }

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
