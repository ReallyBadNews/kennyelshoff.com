import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@components/DropdownMenu";
import Image from "@components/Image";
import { DoubleArrowDownIcon } from "@radix-ui/react-icons";
import { signIn, signOut, useSession } from "next-auth/react";
import { useTheme } from "next-themes";
import { useRouter } from "next/router";
import { Button } from "./Button";
import { IconButton } from "./IconButton";
import { Stack } from "./Stack";
import { Text } from "./Text";
import { Box } from "./Box";

export const AccountMenu = () => {
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const { data: session } = useSession();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <IconButton aria-label="accounnt management" variant="ghost">
          <DoubleArrowDownIcon />
        </IconButton>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" sideOffset={8}>
        <DropdownMenuGroup>
          {session?.user ? (
            <Stack
              css={{
                stackGap: "$3",
                alignItems: "center",
                justifyContent: "center",
              }}
              direction="row"
            >
              {session.user.image ? (
                <Box
                  css={{
                    bg: "$slate5",
                    borderRadius: "$round",
                    overflow: "hidden",
                  }}
                >
                  <Image
                    alt={session.user.name || "Profile picture"}
                    height={34}
                    loader={null}
                    src={session.user.image}
                    width={34}
                  />
                </Box>
              ) : null}
              <Text css={{ fontWeight: "$6" }} size="1">
                {session?.user.name}
              </Text>
            </Stack>
          ) : (
            <Button
              size="1"
              variant="green"
              onClick={() => {
                return signIn("github");
              }}
            >
              Sign In
            </Button>
          )}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuLabel>Change Theme</DropdownMenuLabel>
          <DropdownMenuRadioGroup value={theme} onValueChange={setTheme}>
            <DropdownMenuRadioItem value="system">System</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="light">Light</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="dark">Dark</DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuLabel>Bookmarks</DropdownMenuLabel>
          <DropdownMenuItem
            aria-label="go to new bookmarks page"
            onClick={() => {
              return router.push("/stash/new");
            }}
          >
            Add New
          </DropdownMenuItem>
          <DropdownMenuItem>Share</DropdownMenuItem>
          <DropdownMenuItem>Edit</DropdownMenuItem>
        </DropdownMenuGroup>
        {session?.user ? (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem
                onClick={() => {
                  return signOut({ redirect: false });
                }}
              >
                Sign Out
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </>
        ) : null}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
