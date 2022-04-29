import { Helmet } from "@components/Helmet";
import { formatDate } from "@lib/utils";
import { motion, useReducedMotion } from "framer-motion";
import { ReactNode } from "react";
import { ReadTimeResults } from "reading-time";
import { CSS } from "stitches.config";
import { Box } from "./Box";
import ViewCounter from "./metrics/ViewCounter";
import PageHeader from "./PageHeader";
import { Stack } from "./Stack";
import { Text } from "./Text";

export interface PageProps {
  title?: string;
  description?: string;
  date?: string;
  showDivider?: boolean;
  showHeader?: boolean;
  stackGap?: CSS["stackGap"];
  children?: ReactNode;
}

// Make slug requied when type is "post"
type PageType =
  | { type?: "post"; slug: string; readingTime?: ReadTimeResults }
  | { type?: "basic" | "work"; slug?: never; readingTime?: never };

const Page = ({
  title,
  description,
  date,
  slug,
  readingTime,
  // thumbnail,
  type = "basic",
  stackGap = "$5",
  showDivider = false,
  showHeader = true,
  children,
}: PageProps & PageType) => {
  const shouldReduceMotion = useReducedMotion();
  const hasMeta = !!(title || description);

  return (
    <>
      <Helmet description={description} title={title} />
      <Box
        as={type === "basic" ? "main" : "article"}
        css={{ my: "$6", "@bp1": { my: "$9" } }}
      >
        {(showHeader || showDivider) && (
          <PageHeader
            description={description}
            showDivider={showDivider}
            title={title}
          />
        )}
        <Stack
          animate={{ y: 0, opacity: 1 }}
          as={motion.section}
          css={{
            stackGap,
            display: "block",
            ...(hasMeta && showHeader
              ? { my: "$6", "@bp1": { my: "$9" } }
              : { my: "$0" }),
          }}
          initial={
            shouldReduceMotion ? { y: 0, opacity: 1 } : { y: -10, opacity: 0 }
          }
        >
          {type === "post" && slug ? (
            <Stack
              css={{ stackGap: "$1", justifyContent: "space-between" }}
              direction="row"
            >
              <Text size="1" variant="subtle">
                <time dateTime={date}>
                  {`${formatDate(date as string, "long")}`}
                </time>
              </Text>
              <Stack
                css={{ stackGap: "$1", alignItems: "baseline" }}
                direction="row"
              >
                {readingTime ? <Text size="0">{readingTime.text}</Text> : null}
                <Text size="0">•</Text>
                <ViewCounter slug={slug} />
              </Stack>
            </Stack>
          ) : null}
          {children}
        </Stack>
      </Box>
    </>
  );
};

Page.defaultProps = {
  title: undefined,
  description: undefined,
  date: undefined,
  showDivider: false,
  showHeader: true,
  stackGap: "$5",
  children: undefined,
};

export default Page;
