import { Heading } from "@components/Heading";
import { Link } from "@components/Link";
import { List } from "@components/List";
import Page from "@components/Page";
import { Separator } from "@components/Separator";
import { Stack } from "@components/Stack";
import { Text } from "@components/Text";

export default function Local4Work() {
  return (
    <Page
      description="Motion and brand designer in the Creative Services department"
      title="WDIV-TV / Local 4"
    >
      <Stack css={{ stackGap: "$7" }} marginCollapse>
        <Stack as="dl" css={{ stackGap: "$4" }}>
          <Stack css={{ stackGap: "$1" }}>
            <Text as="dt" fontFamily="mono" size="1" variant="subtle">
              Time Period
            </Text>
            <Text
              as="dt"
              css={{ lineHeight: "$snug" }}
              fontFamily="mono"
              size="2"
              variant="contrast"
            >
              June 2014
            </Text>
          </Stack>
          <Stack css={{ stackGap: "$1" }}>
            <Text as="dt" fontFamily="mono" size="1" variant="subtle">
              Position
            </Text>
            <Text
              as="dt"
              css={{ lineHeight: "$snug" }}
              fontFamily="mono"
              size="2"
              variant="contrast"
            >
              Motion & Brand Designer
            </Text>
          </Stack>
          <Stack css={{ stackGap: "$1" }}>
            <Text as="dt" fontFamily="mono" size="1" variant="subtle">
              Tools
            </Text>
            <Text
              as="dt"
              css={{ lineHeight: "$snug" }}
              fontFamily="mono"
              size="2"
              variant="contrast"
            >
              After Effects, Cinema 4D, Photoshop, Illustrator, Premiere Pro
            </Text>
          </Stack>
        </Stack>
        <Heading as="h2" size="2" variant="contrast" weight="7">
          Select Projects
        </Heading>
        <Separator
          css={{ mt: "$3", mb: "-$4", "@bp1": { my: "$5" } }}
          size="2"
        />
        <List>
          <List.Item>
            Produced high #uality motion graphics in a high paced news cycle
            environment, directly contributing to WDIV s #1 rating among local
            news stations in the Detroit market.
          </List.Item>
          <List.Item>
            {`Designed and created brand assets for daily lifestyle show  `}
            <Link href="https://www.clickondetroit.com/live-in-the-d/">
              Live in the D
            </Link>
            . Including the logo, identity, and show open.
          </List.Item>
          <List.Item>
            Created elements and packages that were adopted throughout the seven
            station group.
          </List.Item>
          <List.Item>
            Developed branding and packaging for big events like America’s
            Thanksgiving Parade and The Ford Fireworks.
          </List.Item>
        </List>
      </Stack>
    </Page>
  );
}
