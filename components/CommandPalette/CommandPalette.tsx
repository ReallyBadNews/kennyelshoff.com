/* eslint-disable react/no-unstable-nested-components */
import {
  ClipboardCopyIcon,
  CodeIcon,
  GitHubLogoIcon,
  LinkedInLogoIcon,
  MagnifyingGlassIcon,
  SunIcon,
  TwitterLogoIcon,
} from "@radix-ui/react-icons";
import {
  Action,
  KBarAnimator,
  KBarPortal,
  KBarPositioner,
  KBarProvider,
  KBarSearch,
} from "kbar";
import { useTheme } from "next-themes";
import { useRouter } from "next/router";
import { css, styled } from "stitches.config";
import { Kbd } from "../Kbd";
import { Stack } from "../Stack";
import { RenderResults } from "./RenderResults";

const iconStyle = css({
  width: "$5",
  height: "$5",
  marginRight: "$2",
  color: "$slateA8",
});

const kbarPosition = css({ position: "absolute" });

export function CommandPalette({ children }: { children?: React.ReactNode }) {
  const router = useRouter();
  const { setTheme } = useTheme();
  const actions: Action[] = [
    {
      id: "copy",
      name: "Copy URL",
      shortcut: ["u"],
      keywords: "copy-url",
      section: "General",
      icon: <ClipboardCopyIcon />,
      perform: () => {
        return navigator.clipboard.writeText(window.location.href);
      },
    },
    {
      id: "theme",
      name: "Change theme",
      keywords: "interface color dark light",
      shortcut: ["t"],
      section: "General",
      icon: <SunIcon />,
    },
    {
      id: "darkTheme",
      name: "Dark",
      keywords: "dark theme",
      section: "",
      shortcut: ["d"],
      perform: () => {
        return setTheme("dark");
      },
      parent: "theme",
    },
    {
      id: "lightTheme",
      name: "Light",
      keywords: "light theme",
      section: "",
      shortcut: ["l"],
      perform: () => {
        return setTheme("light");
      },
      parent: "theme",
    },
    {
      id: "systemTheme",
      name: "System",
      keywords: "system theme",
      section: "",
      shortcut: ["s"],
      perform: () => {
        return setTheme("system");
      },
      parent: "theme",
    },
    {
      id: "source",
      name: "View Source",
      keywords: "view-source",
      section: "General",
      icon: <CodeIcon />,
      perform: () => {
        return window.open(
          "https://github.com/ReallyBadNews/kennyelshoff.com",
          "_blank"
        );
      },
    },
    {
      id: "home",
      name: "Home",
      shortcut: ["g", "h"],
      keywords: "go-home",
      section: "Go To",
      perform: () => {
        return router.push("/");
      },
    },
    {
      id: "work",
      name: "Work",
      shortcut: ["g", "w"],
      keywords: "go-work",
      section: "Go To",
      perform: () => {
        return router.push("/work");
      },
    },
    {
      id: "writing",
      name: "Writing",
      shortcut: ["g", "p"],
      keywords: "go-posts-writing",
      section: "Go To",
      perform: () => {
        return router.push("/posts");
      },
    },
    {
      id: "stash",
      name: "Stash",
      shortcut: ["g", "s"],
      keywords: "go-stash",
      section: "Go To",
      perform: () => {
        return router.push("/stash");
      },
    },
    {
      id: "photos",
      name: "Photos",
      shortcut: ["g", "u"],
      keywords: "go-photos-unsplash",
      section: "Go To",
      perform: () => {
        return router.push("/photos");
      },
    },
    {
      id: "github",
      name: "Github",
      shortcut: ["c", "g"],
      keywords: "go-github",
      section: "Connect",
      icon: <GitHubLogoIcon />,
      perform: () => {
        return window.open("https://github.com/reallybadnews", "_blank");
      },
    },
    {
      id: "twitter",
      name: "Twitter",
      shortcut: ["c", "t"],
      keywords: "go-twitter",
      section: "Connect",
      icon: <TwitterLogoIcon />,
      perform: () => {
        return window.open("https://twitter.com/kennyelshoff", "_blank");
      },
    },
    {
      id: "linkedin",
      name: "LinkedIn",
      shortcut: ["c", "l"],
      keywords: "go-linkedin",
      section: "Connect",
      icon: <LinkedInLogoIcon />,
      perform: () => {
        return window.open(
          "https://www.linkedin.com/in/kennyelshoff/",
          "_blank"
        );
      },
    },
  ];

  const StyledSearch = styled(KBarSearch, {
    py: "$3",
    fontSize: "$2",
    fontFamily: "$jet",
    width: "100%",
    boxSizing: "border-box",
    outline: "none",
    border: "none",
    background: "$loContrast",
    color: "$highContrast",
  });

  const StyledAnimator = styled(KBarAnimator, {
    maxWidth: "$144",
    width: "$full",
    backgroundColor: "$slate1",
    boxShadow: "rgba(0, 0, 0, 0.5) 0px 16px 70px 0px",
  });

  return (
    <KBarProvider actions={actions}>
      <KBarPortal>
        <KBarPositioner className={kbarPosition()}>
          <StyledAnimator>
            <Stack
              css={{
                px: "$3",
                alignItems: "center",
                justifyContent: "space-between",
              }}
              direction="row"
            >
              <MagnifyingGlassIcon className={iconStyle()} />
              <StyledSearch placeholder="Type a command or search…" />
              <Kbd css={{ color: "$slate10" }} size="1">
                esc
              </Kbd>
            </Stack>
            <RenderResults />
          </StyledAnimator>
        </KBarPositioner>
      </KBarPortal>
      {children}
    </KBarProvider>
  );
}

CommandPalette.defaultProps = {
  children: undefined,
};
