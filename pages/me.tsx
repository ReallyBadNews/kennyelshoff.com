import { Heading } from "@components/Heading";
import Page from "@components/Page";
import { Paragraph } from "@components/Paragraph";

export default function Writing() {
  return (
    <Page
      description="I'm not writing it down to remember it later, I'm writing it down to remember it now."
      title="Writing"
    >
      <Heading as="h2" fontFamily="mono" size="2" variant="contrast" weight="7">
        Try something new
      </Heading>
      <Paragraph variant="gray">
        I plan to write short posts in MDX about tips and tricks I have learned
        over the years.
      </Paragraph>
    </Page>
  );
}
