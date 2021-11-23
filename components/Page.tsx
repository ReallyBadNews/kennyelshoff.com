import Footer from "@components/Footer";
import { Helmet } from "@components/Helmet";
import React from "react";
import { Box } from "./Box";
import PageHeader from "./PageHeader";
import { Stack } from "./Stack";

export interface PageProps {
  type?: "basic" | "post" | "work";
  title?: string;
  description?: string;
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
  children,
}) => {
  const Component = type === "basic" ? "section" : "article";
  return (
    <>
      <Helmet description={description} title={title} />
      {/* <a
        className="fixed top-0 left-0 p-1 bg-black dark:bg-gray-200 text-white dark:text-black text-sm transform -translate-y-full focus:translate-y-0"
        href="#main"
      >
        Skip to content
      </a> */}
      <Box css={{ my: "$6", "@bp1": { my: "$9" } }} id="main">
        <Component className="content">
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
            as="section"
            css={{
              stackGap: "$3",
              display: "block",
              my: !(title && description) ? "$0" : "$9",
            }}
          >
            {children}
          </Stack>
        </Component>
      </Box>
      <Footer />
    </>
  );
};

export default Page;
