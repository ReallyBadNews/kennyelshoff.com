import { Box } from "@components/Box";
import { Image } from "@components/Image";
import { Link } from "@components/Link";
import { ThemeToggle } from "@components/ThemeToggle";
import NextLink from "next/link";
import { Stack } from "./Stack";

const navItems = [
  { title: "home", path: "/" },
  { title: "work", path: "/work" },
  { title: "personal", path: "/me" },
  { title: "stash", path: "/stash" },
];

export const Header = () => {
  return (
    <Box
      as="header"
      css={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Stack
        css={{
          stackGap: "$4",
          "@bp1": { alignItems: "center", stackGap: "$7" },
        }}
        direction={{ "@initial": "column", "@bp1": "row" }}
      >
        <NextLink href="/" passHref>
          <Box
            as="a"
            css={{
              bg: "$blueA2",
              width: "$12",
              height: "$12",
              borderRadius: "$rg",
              overflow: "hidden",
            }}
          >
            <Image
              alt="Picture of Kenny Elshoff"
              height={48}
              layout="fixed"
              src="/images/kenny.png"
              width={48}
              priority
            />
          </Box>
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
                  <NextLink href={item.path} passHref>
                    <Link variant="subtle">{item.title}</Link>
                  </NextLink>
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
