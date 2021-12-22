import { Box } from "@components/Box";
import { Image } from "@components/Image";
import NextLink from "@components/NextLink";
import { ThemeToggle } from "@components/ThemeToggle";
import { motion } from "framer-motion";
import { useState } from "react";
import { Stack } from "./Stack";

const navItems = [
  { title: "work", path: "/work" },
  { title: "writing", path: "/posts" },
  { title: "/stash", path: "/stash" },
];

export const Header = () => {
  const [activeItem, setActiveItem] = useState<number | null>(null);

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
          }}
          href="/"
        >
          <Image
            alt="Kenny Elshoff doing a method on a snowboard"
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAIAAAAmkwkpAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAP0lEQVQImQE0AMv/APT//93o+7m/0tzi+QCOmakAAA2Vm67i6/8AfYqfFxwmvMjg0Nz2AMna+ZytyIqbsa6/2nBcIQrExCjkAAAAAElFTkSuQmCC"
            height={48}
            layout="fixed"
            placeholder="blur"
            src="/images/kenny.png"
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
              return setActiveItem(null);
            }}
            onHoverStart={() => {}}
          >
            {navItems.map((item, index) => {
              const activeIndex = activeItem === index;

              return (
                <motion.li
                  key={item.title}
                  onHoverStart={() => {
                    return setActiveItem(index);
                  }}
                >
                  <NextLink
                    css={{ position: "relative", px: "$2", py: "$2" }}
                    href={item.path}
                    title={item.title}
                    variant="transparent"
                    onBlur={() => {
                      return setActiveItem(null);
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
      <ThemeToggle />
    </Box>
  );
};
