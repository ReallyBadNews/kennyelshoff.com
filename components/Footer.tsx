import { ArrowRightIcon } from "@radix-ui/react-icons";
import { css } from "stitches.config";
import NextLink from "./NextLink";
import { Text } from "./Text";
import { Stack } from "./Stack";

const footerLinks = {
  left: [
    {
      title: "Github",
      url: "https://github.com/reallybadnews",
      external: true,
    },
    {
      title: "Mastodon",
      url: "https://federated.press/@kenny",
      external: true,
    },
    {
      title: "Twitter",
      url: "https://twitter.com/kennyelshoff",
      external: true,
    },
    {
      title: "LinkedIn",
      url: "https://linkedin.com/kennyelshoff",
      external: true,
    },
    {
      title: "Email",
      url: "mailto:hello@kennyelshoff.com",
      external: true,
    },
  ],
  right: [
    { title: "Resume", url: "/kenny_elshoff-resume.pdf", external: false },
    { title: "Colophon", url: "/colophon", external: false },
    { title: "Tools", url: "/tools", external: false },
  ],
};

const iconStyle = css({
  width: "12px",
  height: "12px",
  color: "$slateA8",
});

export function Footer() {
  return (
    <Stack
      as="footer"
      css={{
        stackGap: "$4",
        pt: "$4",
        mt: "auto",
        borderTop: "1px solid $grayA4",
        justifyContent: "space-between",
      }}
      direction={{ "@initial": "column", "@bp1": "row" }}
    >
      <Stack
        css={{
          stackGap: "$0",
          justifyContent: "space-between",
          "@bp1": { stackGap: "$4", justifyContent: "flex-start" },
        }}
        direction="row"
      >
        {footerLinks.left.map(({ title, url, external }) => {
          return (
            <NextLink
              key={title}
              css={{ display: "flex", gap: "$1", "@bp1": { gap: "$2" } }}
              href={url}
              rel={title === "Mastodon" ? "me" : undefined}
              target={external ? "_blank" : undefined}
              title={title}
              variant="subtle"
            >
              {external ? <ArrowRightIcon className={iconStyle()} /> : null}
              <Text size="0">{title}</Text>
            </NextLink>
          );
        })}
      </Stack>
      <Stack css={{ stackGap: "$4", justifyContent: "center" }} direction="row">
        {footerLinks.right.map(({ title, url, external }) => {
          return (
            <NextLink
              key={title}
              css={{ display: "flex", gap: "$1", "@bp1": { gap: "$2" } }}
              href={url}
              target={external ? "_blank" : undefined}
              title={title}
              variant="subtle"
            >
              {external ? <ArrowRightIcon className={iconStyle()} /> : null}
              <Text size="0">{title}</Text>
            </NextLink>
          );
        })}
      </Stack>
    </Stack>
  );
}
