import NextLink from "next/link";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import { styled } from "stitches.config";
import { Link } from "./Link";
import { Text } from "./Text";
import { Stack } from "./Stack";

const Icon = styled(ArrowRightIcon);

export default function Footer() {
  return (
    <Stack
      as="footer"
      css={{
        stackGap: "$4",
        py: "$4",
        mt: "auto",
        borderTop: "1px solid $grayA4",
      }}
      direction="row"
    >
      <NextLink href="/" passHref>
        <Link css={{ display: "flex" }} variant="subtle">
          <Icon css={{ width: "12px", height: "12px" }} />
          <Text size="0">Github</Text>
        </Link>
      </NextLink>
      <NextLink href="/" passHref>
        <Link css={{ display: "flex" }} variant="subtle">
          <Icon css={{ width: "12px", height: "12px" }} />
          <Text size="0">Twitter</Text>
        </Link>
      </NextLink>
      <NextLink href="/" passHref>
        <Link css={{ display: "flex" }} variant="subtle">
          <Icon css={{ width: "12px", height: "12px" }} />
          <Text size="0">LinkedIn</Text>
        </Link>
      </NextLink>
    </Stack>
  );
}
