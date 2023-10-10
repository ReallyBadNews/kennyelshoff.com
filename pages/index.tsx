import { Heading } from "@components/Heading";
import NextLink from "@components/NextLink";
import Page from "@components/Page";
import { Paragraph } from "@components/Paragraph";
import { Separator } from "@components/Separator";
import { Stack } from "@components/Stack";

export default function Home() {
  return (
    <Page>
      <Stack css={{ stackGap: "$3" }}>
        <Heading size="4" variant="contrast" weight="9" gradient>
          Hey there.
        </Heading>
        <Stack css={{ stackGap: "$4" }}>
          <Paragraph size="2" variant="gray">
            I&apos;m Kenny, a design engineer focused on digital craft,
            maintainable CSS, motion, React, TypeScript, and of course who can
            forget about design systems.
          </Paragraph>
          <Separator size="2" />
          <Paragraph size="1" variant="gray">
            {`In my free time, I'm usually goofing off with my kids, `}
            <NextLink
              href="https://unsplash.com/@reallybadnews/collections"
              variant="contrast"
            >
              snowboarding
            </NextLink>
            {", and occasionally some "}
            <NextLink href="/photos" variant="contrast">
              photography
            </NextLink>
          </Paragraph>
          <Paragraph size="1" variant="gray">
            {`Currently working with `}
            <NextLink
              href="https://grahammedia.com/"
              rel="noopener"
              variant="contrast"
            >
              Graham Media Group
            </NextLink>
            {` to build Local News better.`}
          </Paragraph>
        </Stack>
      </Stack>
    </Page>
  );
}
