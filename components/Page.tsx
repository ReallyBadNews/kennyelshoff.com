import React from "react";
// import Banner from "@/components/Banner";
// import Header from "@/components/Header";
import { Helmet } from "@components/Helmet";
import Footer from "@components/Footer";
import { Box } from "./Box";

interface PageProps {
  type?: "basic" | "post" | "work";
  title?: string;
  description?: string;
  // date?: string;
  // link?: string;
  // thumbnail?: {
  //   src: string;
  //   width: string;
  //   height: string;
  //   alt: string;
  // };
  // slug?: string;
}

const Page: React.FC<PageProps> = ({
  title,
  // TODO: Update description
  description = "Detail oriented user interface engineer currently interested in CSS architecture, React, TypeScript, design systems, and state machines.",
  // date,
  // link,
  // slug,
  // thumbnail,
  type,
  children,
}) => {
  const Component = type === "basic" ? "div" : "article";
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
        <Component>
          {/* <Header
            date={date}
            description={description}
            link={link}
            slug={slug}
            thumbnail={thumbnail}
            title={title}
            type={type}
          /> */}
          {children}
        </Component>
      </Box>
      <Footer />
    </>
  );
};

Page.defaultProps = {
  type: "basic",
  title: undefined,
  description: undefined,
  // date: undefined,
  // link: undefined,
  // thumbnail: undefined,
  // slug: undefined,
};

export default Page;
