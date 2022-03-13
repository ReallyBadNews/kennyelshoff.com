import { ArrowRightIcon } from "@radix-ui/react-icons";
import { css } from "stitches.config";
import NextLink from "./NextLink";
import { Text } from "./Text";
import { Stack } from "./Stack";

const footerLinks = [
  {
    title: "Github",
    url: "https://github.com/reallybadnews",
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
];

const iconStyle = css({
  width: "12px",
  height: "12px",
  color: "$slateA8",
});

export default function Footer() {
  return (
    <Stack
      as="footer"
      css={{
        stackGap: "$4",
        pt: "$4",
        mt: "auto",
        borderTop: "1px solid $grayA4",
      }}
      direction="row"
    >
      {footerLinks.map(({ title, url, external }) => {
        return (
          <NextLink
            key={title}
            css={{ display: "flex", gap: "$2" }}
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
  );
}
