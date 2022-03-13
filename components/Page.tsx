import { Helmet } from "@components/Helmet";
import { motion, useReducedMotion } from "framer-motion";
import { ReactNode } from "react";
import { CSS } from "stitches.config";
import { Box } from "./Box";
import PageHeader from "./PageHeader";
import { Stack } from "./Stack";

export interface PageProps {
  type?: "basic" | "post" | "work";
  title?: string;
  description?: string;
  showDivider?: boolean;
  showHeader?: boolean;
  stackGap?: CSS["stackGap"];
  children?: ReactNode;
}

const Page = ({
  title,
  description,
  // date,
  // thumbnail,
  type = "basic",
  stackGap = "$5",
  showDivider = false,
  showHeader = true,
  children,
}: PageProps) => {
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
          {children}
        </Stack>
      </Box>
    </>
  );
};

Page.defaultProps = {
  type: "basic",
  title: undefined,
  description: undefined,
  showDivider: false,
  showHeader: true,
  stackGap: "$5",
  children: undefined,
};

export default Page;
