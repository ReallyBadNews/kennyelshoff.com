import { Heading } from "@components/Heading";
import { Link } from "@components/Link";
import Page from "@components/Page";
import { Paragraph } from "@components/Paragraph";
import { Stack } from "@components/Stack";

export default function Home() {
  return (
    <Page>
      <Stack css={{ stackGap: "$6" }}>
        <Stack css={{ stackGap: "$3" }}>
          <Heading
            css={{ lh: "$normal" }}
            size="2"
            variant="blue"
            weight="9"
            gradient
          >
            Hi, I&apos;m Kenny.
          </Heading>
          <Stack css={{ stackGap: "$4" }}>
            <Paragraph css={{ lh: "$relaxed" }} size="1" variant="gray">
              A user interface engineer & designer interested in digital craft,
              maintainable CSS, motion, React, TypeScript, and of course who can
              forget about design systems.
            </Paragraph>
            <Paragraph css={{ lh: "$relaxed" }} size="1" variant="gray">
              {`In my free time, I'm usually goofing off with my twin sons (who are now four!!), `}
              <Link
                href="https://unsplash.com/"
                target="_blank"
                variant="contrast"
              >
                snowboarding
              </Link>
              {", and occasionally some "}
              <Link
                href="https://unsplash.com/"
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
              {/* <Link
                href="https://grahammedia.com/"
                rel="noopener"
                target="_blank"
                variant="subtle"
              >
                Graham Media Group
              </Link> */}
              {` to build Local News better.`}
            </Paragraph>
          </Stack>
        </Stack>
      </Stack>
    </Page>
  );
}
