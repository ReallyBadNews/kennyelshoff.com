import Page from "@components/Page";
import { Separator } from "@components/Separator";
import { Stack } from "@components/Stack";

export default function Local4Work() {
  return (
    <Page
      description="Motion and brand designer in the Creative Services department"
      title="WDIV-TV / Local 4"
    >
      <Separator size="2" />
      <Stack css={{ stackGap: "$3" }}>
        <dl>
          <dt>Start Date</dt>
          <dd>December 2014</dd>
          <dt>Position</dt>
          <dd>Motion & Brand Designer</dd>
        </dl>
      </Stack>
    </Page>
  );
}
