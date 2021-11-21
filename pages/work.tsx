import { Heading } from "@components/Heading";
import Page from "@components/Page";
import { Paragraph } from "@components/Paragraph";
import { Separator } from "@components/Separator";
import { Stack } from "@components/Stack";
import { Text } from "@components/Text";

export default function Work() {
  return (
    <Page title="Work">
      <Stack css={{ stackGap: "$9" }}>
        <Stack css={{ stackGap: "$3" }}>
          <Heading size="2" variant="contrast" weight="9" gradient>
            Work
          </Heading>
          <Paragraph size="1" variant="gray">
            I love the little details, the subtle touches that show the care and
            craft
          </Paragraph>
        </Stack>
        <Stack css={{ stackGap: "$3", display: "block" }}>
          <Heading as="h2" size="2" variant="contrast" weight="9" gradient>
            Experience
          </Heading>
          <Separator css={{ my: "$5" }} size="2" />
          <Stack
            css={{ stackGap: "$3" }}
            direction={{ "@initial": "column", "@bp1": "row" }}
          >
            <Stack css={{ stackGap: "$2" }}>
              <Text size="0" variant="orange">
                2018-present
              </Text>
              <Heading as="h3" weight="9">
                Graham Media Group
              </Heading>
              <Text size="0" variant="blue">
                Web developer
              </Text>
              <Paragraph size="0" variant="gray">
                Helping teams build consistent, high-quality and inclusive user
                interfaces with React. Working remotely, floating between design
                and engineering teams.
              </Paragraph>
            </Stack>
            <Stack css={{ stackGap: "$2" }}>
              <Heading as="h3" weight="9">
                WDIV-TV
              </Heading>
              <Paragraph size="0" variant="gray">
                Helping teams build consistent, high-quality and inclusive user
                interfaces with React. Working remotely, floating between design
                and engineering teams.
              </Paragraph>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </Page>
  );
}
