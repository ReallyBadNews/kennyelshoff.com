import { Heading } from "@components/Heading";
import NextLink from "@components/NextLink";
import Page from "@components/Page";
import { Paragraph } from "@components/Paragraph";
import { Stack } from "@components/Stack";
import { Separator } from "@components/Separator";

export default function Home() {
  return (
    <Page>
      <Stack css={{ stackGap: "$3" }}>
        <Heading size="4" variant="contrast" weight="9" gradient>
          Hello! I&apos;m Kenny Elshoff.
        </Heading>
        <Stack css={{ stackGap: "$4" }}>
          <Paragraph size="2" variant="gray">
            A design engineer focused on digital craft, maintainable CSS,
            motion, React, TypeScript, and of course who can forget about design
            systems.
          </Paragraph>
          <Separator size="2" />
          <Paragraph size="1" variant="gray">
            {`In my free time, I'm usually goofing off with my twin sons (who are now four!!), `}
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
          <Paragraph size="1" variant="gray">
            I think of this site as a playground and a location free to
            experiment with new techniques and technologies. Is it overkill?
            Yeah, of course. Is it fun to build? Hell yeah. Will it ever be
            finished? Probably not. This site is built with Next.js, Stitches,
            Radix Primitives & Colors, TypeScript, MDX and hosted on Vercel.
          </Paragraph>
          <Paragraph size="1" variant="gray">
            ¯\_(ツ)_/¯
          </Paragraph>
        </Stack>
      </Stack>
    </Page>
  );
}
