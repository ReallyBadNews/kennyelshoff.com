import { Box } from "@components/Box";
import Image from "next/image";
import NextLink from "@components/NextLink";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Stack } from "./Stack";

const navItems = [
  { title: "work", path: "/work" },
  { title: "writing", path: "/posts" },
  { title: "/stash", path: "/stash" },
];

// Dynamically import AccountMenu component
const AccountMenu = dynamic(async () => {
  const { AccountMenu: Menu } = await import("./AccountMenu");
  return Menu;
});

export const Header = () => {
  const router = useRouter();

  // This array destructuring is kinda weird
  const [, currentPageSlug] = router.pathname.split("/");
  const currentPageIndex = navItems.findIndex((item) => {
    return item.path === `/${currentPageSlug}`;
  });

  const [activeItem, setActiveItem] = useState<number>(currentPageIndex);

  // Remove the nav highlight if the user navigates to a page that isn't in the nav
  useEffect(() => {
    const handleRouteChange = () => {
      if (currentPageIndex === -1) {
        setActiveItem(-1);
      }
    };

    router.events.on("routeChangeComplete", handleRouteChange);

    // If the component is unmounted, unsubscribe
    // from the event with the `off` method:
    return () => {
      return router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events, currentPageIndex]);

  return (
    <Box
      as="header"
      css={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
        "@bp1": { alignItems: "center" },
      }}
    >
      <Stack
        css={{
          stackGap: "$4",
          "@bp1": { alignItems: "center", stackGap: "$7" },
        }}
        direction={{ "@initial": "column", "@bp1": "row" }}
      >
        <NextLink
          css={{
            bg: "$blueA2",
            width: "$12",
            height: "$12",
            borderRadius: "$rg",
            overflow: "hidden",
            display: "block",
          }}
          href="/"
          title="Home"
        >
          <Image
            alt="Kenny Elshoff doing a method on a snowboard"
            blurDataURL="data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAEAAQDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAdEAABBAIDAAAAAAAAAAAAAAABAAIFEQMEByJB/8QAFQEBAQAAAAAAAAAAAAAAAAAABQf/xAAbEQACAQUAAAAAAAAAAAAAAAAAAQIDBBIhcf/aAAwDAQACEQMRAD8AqOEZTNIwE3tbTWuy5JrbceziBZaaFk0B4ERFMrzVeXR+DeKP/9k="
            height={48}
            placeholder="blur"
            src="/images/kenny-2.jpg"
            width={48}
            priority
          />
        </NextLink>
        <nav>
          <Stack
            as={motion.ul}
            css={{
              stackGap: "$3",
              p: "0",
              m: "0",
              li: { listStyle: "none" },
              "@bp1": { stackGap: "$5" },
            }}
            direction="row"
            onHoverEnd={() => {
              return setActiveItem(currentPageIndex);
            }}
            onHoverStart={() => {}}
          >
            {navItems.map((item, index) => {
              const activeIndex = activeItem !== -1 && activeItem === index;

              return (
                <motion.li
                  key={item.title}
                  onHoverStart={() => {
                    return setActiveItem(index);
                  }}
                >
                  <NextLink
                    css={{
                      position: "relative",
                      px: "$2",
                      py: "$2",
                      "&:focus span": {
                        outline: "2px solid $slate7",
                      },
                    }}
                    href={item.path}
                    title={item.title}
                    variant="transparent"
                    onBlur={() => {
                      return setActiveItem(currentPageIndex);
                    }}
                    onClick={() => {
                      return setActiveItem(index);
                    }}
                    onFocus={() => {
                      return setActiveItem(index);
                    }}
                  >
                    {activeIndex && (
                      <Box
                        animate={{ opacity: 1 }}
                        as={motion.span}
                        className="shadow"
                        css={{
                          position: "absolute",
                          inset: "0",
                          zIndex: -1,
                          bg: "$slateA4",
                          borderRadius: "$md",
                        }}
                        exit={{ opacity: 0 }}
                        initial={{ opacity: 0 }}
                        layoutId="shadow"
                        transition={{ duration: 0.2 }}
                      />
                    )}
                    {item.title}
                  </NextLink>
                </motion.li>
              );
            })}
          </Stack>
        </nav>
      </Stack>
      <AccountMenu />
    </Box>
  );
};
