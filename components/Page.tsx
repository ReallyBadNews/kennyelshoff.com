import { Helmet } from "@components/Helmet";
import { motion, useReducedMotion } from "framer-motion";
import React from "react";
import { CSS } from "stitches.config";
import { Box } from "./Box";
import PageHeader from "./PageHeader";
import { Stack } from "./Stack";

export interface PageProps {
  type?: "basic" | "post" | "work";
  title?: string;
  description?: string;
  stackGap?: CSS["stackGap"];
}

const Page: React.FC<PageProps> = ({
  title,
  // TODO: Update description
  description,
  // date,
  // link,
  // slug,
  // thumbnail,
  type = "basic",
  stackGap = "$3",
  children,
}) => {
  const shouldReduceMotion = useReducedMotion();
  const hasMeta = !!(title || description);

  return (
    <>
      <Helmet description={description} title={title} />
      {/* <a
        className="fixed top-0 left-0 p-1 bg-black dark:bg-gray-200 text-white dark:text-black text-sm transform -translate-y-full focus:translate-y-0"
        href="#main"
      >
        Skip to content
      </a> */}
      <Box
        as={type === "basic" ? "section" : "article"}
        css={{ my: "$6", "@bp1": { my: "$9" } }}
      >
        <PageHeader
          // date={date}
          description={description}
          // link={link}
          // slug={slug}
          // thumbnail={thumbnail}
          title={title}
          type={type}
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
