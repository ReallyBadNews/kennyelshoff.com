import Head from "next/head";
import { useTheme } from "next-themes";
import { Button } from "@components/Button";
import { Heading } from "@components/Heading";
import { Stack } from "@components/Stack";
import { Box } from "@components/Box";
import { Container } from "@components/Container";
import { Link } from "@components/Link";
import { Paragraph } from "@components/Paragraph";
import { Grid } from "@components/Grid";

export default function Home(): JSX.Element {
  const { theme, setTheme } = useTheme();

  return (
    <>
      <Head>
        <title>Kenny Elshoff</title>
        <meta content="Generated by create next app" name="description" />
        <link href="/favicon.ico" rel="icon" />
      </Head>
      <Box
        css={{
          width: "$full",
          bg: "$slateA2",
          borderBottom: "1px solid $slateA4",
          py: "$3",
        }}
      >
        <Container
          css={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
          size="2"
        >
          <Heading size="1" variant="blue" weight="9">
            KE
          </Heading>
          <Button
            size="1"
            variant="blue"
            onClick={() => {
              return theme === "dark" ? setTheme("light") : setTheme("dark");
            }}
          >
            Change theme
          </Button>
        </Container>
      </Box>
      <Container as="main" css={{ py: "$9", minHeight: "100vh" }} size="2">
        <Stack css={{ stackGap: "$9" }}>
          <Stack
            css={{ stackGap: "$3" }}
            direction={{ "@initial": "column", "@bp2": "row" }}
          >
            <Button
              size="1"
              variant="blue"
              onClick={() => {
                return theme === "dark" ? setTheme("light") : setTheme("dark");
              }}
            >
              Change theme
            </Button>
            <Button
              size="2"
              variant="gray"
              onClick={() => {
                return theme === "dark" ? setTheme("light") : setTheme("dark");
              }}
            >
              Change theme
            </Button>
            <Button
              size="3"
              variant="green"
              onClick={() => {
                return theme === "dark" ? setTheme("light") : setTheme("dark");
              }}
            >
              Change theme
            </Button>
            <Button
              size="4"
              variant="red"
              onClick={() => {
                return theme === "dark" ? setTheme("light") : setTheme("dark");
              }}
            >
              Change theme
            </Button>
          </Stack>
          <Stack css={{ stackGap: "$3" }}>
            <Heading size="2" variant="contrast" weight="9">
              Welcome!
            </Heading>
            <Stack css={{ stackGap: "$4" }}>
              <Paragraph
                css={{ lineHeight: "$relaxed" }}
                size="1"
                variant="gray"
              >
                {
                  "My name is Kenny. I'm a front-end engineer & designer. I'm a lover of systems, finding patterns, "
                }
                <Link
                  href="https://unsplash.com/"
                  target="_blank"
                  variant="blue"
                >
                  snowboarding
                </Link>
                {", and occasionally "}
                <Link
                  href="https://unsplash.com/"
                  target="_blank"
                  variant="blue"
                >
                  photography
                </Link>
              </Paragraph>
              <Paragraph
                css={{ lineHeight: "$relaxed" }}
                size="1"
                variant="gray"
              >
                {`Currently working with `}
                <Link
                  href="https://grahammedia.com/"
                  rel="noopener"
                  target="_blank"
                  variant="subtle"
                >
                  Graham Media Group
                </Link>
                {` to build Local News better.`}
              </Paragraph>
            </Stack>
          </Stack>
          <Stack css={{ stackGap: "$3" }}>
            <Heading size="2" variant="contrast" weight="9">
              Welcome!
            </Heading>
            <Stack
              css={{ stackGap: "$4", "> *": { flex: "1" } }}
              direction={{ "@bp3": "row" }}
            >
              <Paragraph
                css={{ lineHeight: "$relaxed" }}
                size="1"
                variant="gray"
              >
                {
                  "My name is Kenny. I'm a front-end engineer & designer. I'm a lover of systems, finding patterns, "
                }
                <Link
                  href="https://unsplash.com/"
                  target="_blank"
                  variant="blue"
                >
                  snowboarding
                </Link>
                {", and occasionally "}
                <Link
                  href="https://unsplash.com/"
                  target="_blank"
                  variant="blue"
                >
                  photography
                </Link>
              </Paragraph>
              <Paragraph
                css={{ lineHeight: "$relaxed" }}
                size="1"
                variant="gray"
              >
                {`Currently working with `}
                <Link
                  href="https://grahammedia.com/"
                  rel="noopener"
                  target="_blank"
                  variant="subtle"
                >
                  Graham Media Group
                </Link>
                {` to build Local News better.`}
              </Paragraph>
            </Stack>
          </Stack>
          <Grid css={{ minColumnWidth: "$32" }} gap="3">
            {Array.from({ length: 14 }).map((_, i) => {
              return (
                // eslint-disable-next-line react/no-array-index-key
                <Box key={`array_${i}`} css={{ bg: "$skyA3", height: "$12" }} />
              );
            })}
          </Grid>
        </Stack>
      </Container>
    </>
  );
}
