import { Box } from "@components/Box";
import { Image } from "@components/Image";
import NextLink from "@components/NextLink";
import { ThemeToggle } from "@components/ThemeToggle";
import { Stack } from "./Stack";

const navItems = [
  { title: "work", path: "/work" },
  { title: "writing", path: "/posts" },
  { title: "/stash", path: "/stash" },
];

export const Header = () => {
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
        <Box as="nav">
          <Stack
            as="ul"
            css={{
              stackGap: "$3",
              p: "0",
              m: "0",
              li: { listStyle: "none" },
              "@bp1": { stackGap: "$5" },
            }}
            direction="row"
          >
            {navItems.map((item) => {
              return (
                <li key={item.title}>
                  <NextLink href={item.path}>{item.title}</NextLink>
                </li>
              );
            })}
          </Stack>
        </Box>
      </Stack>
      <ThemeToggle />
    </Box>
  );
};
