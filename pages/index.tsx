import { Heading } from "@components/Heading";
import { Link } from "@components/Link";
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
            <Link
              href="https://unsplash.com/@reallybadnews/collections"
              target="_blank"
              variant="contrast"
            >
              snowboarding
            </Link>
            {", and occasionally some "}
            <Link
              href="https://unsplash.com/@reallybadnews"
              target="_blank"
              variant="contrast"
            >
              photography
            </Link>
          </Paragraph>
          <Paragraph size="1" variant="gray">
            {`Currently working with `}
            <Link
              href="https://grahammedia.com/"
              rel="noopener"
              target="_blank"
              variant="contrast"
            >
              Graham Media Group
            </Link>
            {` to build Local News better.`}
          </Paragraph>
          <Paragraph size="1" variant="gray">
            I think of this site as a playground, and a location free to
            experiment with new techniques and technologies. Is it overkill?
            Yeah, of course. Is it fun to build? Hell yeah.
          </Paragraph>
        </Stack>
      </Stack>
    </Page>
  );
}
