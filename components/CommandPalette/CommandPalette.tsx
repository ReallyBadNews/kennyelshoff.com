/* eslint-disable react/no-unstable-nested-components */
import {
  Action,
  KBarAnimator,
  KBarPortal,
  KBarPositioner,
  KBarProvider,
  KBarSearch,
} from "kbar";
import { useTheme } from "next-themes";
import { css } from "stitches.config";
import { RenderResults } from "./RenderResults";

export function CommandPalette({ children }: { children?: React.ReactNode }) {
  const { setTheme } = useTheme();
  const actions: Action[] = [
    {
      id: "theme",
      name: "Change theme",
      keywords: "interface color dark light",
      shortcut: ["t"],
      section: "General",
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
  ];

  const kbarPosition = css({ position: "absolute" });

  return (
    <KBarProvider actions={actions}>
      <KBarPortal>
        <KBarPositioner className={kbarPosition()}>
          <KBarAnimator>
            <KBarSearch placeholder="Type a command or search…" />
            <RenderResults />
            {children}
          </KBarAnimator>
        </KBarPositioner>
      </KBarPortal>
    </KBarProvider>
  );
}

CommandPalette.defaultProps = {
  children: undefined,
};
