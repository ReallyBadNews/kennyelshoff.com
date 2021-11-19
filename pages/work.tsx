import { Heading } from "@components/Heading";
import Page from "@components/Page";
import { Paragraph } from "@components/Paragraph";
import { Separator } from "@components/Separator";
import { Stack } from "@components/Stack";

export default function Work() {
  return (
    <Page title="Work">
      <Stack css={{ stackGap: "$5" }}>
        <Stack css={{ stackGap: "$3" }}>
          <Heading size="2" variant="contrast" weight="9" gradient>
            Work
          </Heading>
          <Paragraph size="1" variant="gray">
            I love the little details, the subtle touches that show the care and
            craft
          </Paragraph>
        </Stack>
        <Stack css={{ stackGap: "$3" }}>
          <Heading size="2" variant="contrast" weight="9" gradient>
            Graham Media Group
          </Heading>
          <Separator size="1" />
          <Paragraph size="1" variant="gray">
            Helping teams build consistent, high-quality and inclusive user
            interfaces with React. Working remotely, floating between design and
            engineering teams.
          </Paragraph>
        </Stack>
      </Stack>
    </Page>
  );
}
