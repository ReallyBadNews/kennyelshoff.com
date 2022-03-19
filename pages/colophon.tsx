import { List } from "@components/List";
import Page from "@components/Page";
import { Paragraph } from "@components/Paragraph";

export default function Colophon() {
  return (
    <Page
      description="There are loads of helpful open source projects that make this site possible"
      title="Colophon"
    >
      <Paragraph size="1">
        Here are some of the projects that make this site possible:
      </Paragraph>
      <List>
        <li>Stitches</li>
        <li>Radix</li>
      </List>
    </Page>
  );
}
