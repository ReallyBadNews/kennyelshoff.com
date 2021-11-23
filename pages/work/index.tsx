import { Grid } from "@components/Grid";
import { Heading } from "@components/Heading";
import NextLink from "@components/NextLink";
import Page from "@components/Page";
import { Paragraph } from "@components/Paragraph";
import { Separator } from "@components/Separator";
import { Stack } from "@components/Stack";
import { Text } from "@components/Text";

interface Job {
  company: string;
  url?: string;
  title: string;
  date: string;
  excerpt?: string;
}

const experience: Job[] = [
  {
    company: "Graham Media Group",
    url: "/work/graham-media-group/",
    title: "Front-end Engineer",
    date: "2018 - Present",
  },
  {
    company: "Local 4 / WDIV-TV",
    url: "/work/local-4/",
    title: "Brand & Motion Designer",
    date: "2014 - 2018",
  },
  {
    company: "Local 4 / WDIV-TV",
    title: "Motion Design Trainee",
    date: "2013 - 2014",
  },
];

export default function Work() {
  return (
    <Page
      description="I love the little details, the subtle touches that show the care and
            craft that went into producing the work. Trust in the process. Play, experiment, iterate, repeat."
      title="Work"
    >
      <Heading as="h2" fontFamily="mono" size="2" variant="contrast" weight="7">
        Experience
      </Heading>
      <Separator css={{ my: "$5" }} size="2" />
      <Grid columns={{ "@initial": 1, "@bp1": 2 }} gap="4">
        {experience.map(({ company, url, title, date, excerpt }, index) => {
          return (
            <Stack
              key={title}
              css={{
                stackGap: "$3",
                p: "$4 $3",
                background:
                  "linear-gradient(90deg, $slateA1 0%, $slateA2 100%)",
                border: "1px solid $slateA3",
                borderRadius: "$rg",
                ...(index === 0 && { gridColumn: "-1 / 1" }),
              }}
            >
              <Stack css={{ stackGap: "$3" }}>
                {url ? (
                  <NextLink href={url}>
                    <Heading as="h3" weight="9">
                      {company}
                    </Heading>
                  </NextLink>
                ) : (
                  <Heading as="h3" weight="9">
                    {company}
                  </Heading>
                )}
                <Stack css={{ stackGap: "$2" }} direction="row">
                  <Text size="0" variant="blue">
                    {title}
                  </Text>
                  <Separator orientation="vertical" size="1" />
                  <Text size="0" variant="contrast" weight="4">
                    <em>{date}</em>
                  </Text>
                </Stack>
              </Stack>
              {excerpt ? (
                <Paragraph size="0" variant="gray">
                  {excerpt}
                </Paragraph>
              ) : null}
            </Stack>
          );
        })}
      </Grid>
    </Page>
  );
}
