import { FC } from "react";
import { useTheme } from "next-themes";
import { SunIcon } from "@radix-ui/react-icons";
import { IconButton } from "@components/IconButton";
import { Tooltip } from "@components/Tooltip";
import { VariantProps } from "stitches.config";

export const ThemeToggle: FC<VariantProps<typeof IconButton>> = (props) => {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <Tooltip align="end" content="Toggle theme" side="bottom">
      <IconButton
        variant="ghost"
        onClick={() => {
          const newTheme = resolvedTheme === "dark" ? "light" : "dark";
          setTheme(newTheme);
        }}
        {...props}
        aria-label="toggle a light and dark color scheme"
      >
        <SunIcon />
      </IconButton>
    </Tooltip>
  );
};
