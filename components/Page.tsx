import { Helmet } from "@components/Helmet";
import { motion, useReducedMotion } from "framer-motion";
import { FC } from "react";
import { CSS } from "stitches.config";
import { Box } from "./Box";
import PageHeader from "./PageHeader";
import { Stack } from "./Stack";

export interface PageProps {
  type?: "basic" | "post" | "work";
  title?: string;
  description?: string;
  showDivider?: boolean;
  stackGap?: CSS["stackGap"];
}

const Page: FC<PageProps> = ({
  title,
  description,
  // date,
  // thumbnail,
  type = "basic",
  stackGap = "$5",
  showDivider,
  children,
}) => {
  const shouldReduceMotion = useReducedMotion();
  const hasMeta = !!(title || description);

  return (
    <>
      <Helmet description={description} title={title} />
      <Box
        as={type === "basic" ? "main" : "article"}
        css={{ my: "$6", "@bp1": { my: "$9" } }}
      >
        <PageHeader
          description={description}
          showDivider={showDivider}
          title={title}
        />
        <Stack
          animate={{ y: 0, opacity: 1 }}
          as={motion.section}
          css={{
            stackGap,
            display: "block",
            ...(hasMeta ? { my: "$6", "@bp1": { my: "$9" } } : { my: "$0" }),
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

export default Page;
