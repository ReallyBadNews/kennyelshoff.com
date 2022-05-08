import { Flex } from "@components/Flex";
import { Action } from "kbar";
import React from "react";

export const ResultItem = React.forwardRef<
  HTMLDivElement,
  {
    action: Action;
    active: boolean;
  }
>(({ action, active }, ref) => {
  return (
    <Flex
      ref={ref}
      // className={cx(
      //   "px-4 py-2 flex items-center justify-between border-l-2 border-transparent cursor-pointer",
      //   "text-gray-600",
      //   "dark:text-gray-300",
      //   active &&
      //     cx(
      //       "border-violet-600 bg-violet-200",
      //       "dark:border-violet-800 dark:bg-violet-600 dark:text-white"
      //     )
      // )}
      css={{
        px: "$4",
        py: "$2",
        bg: "$slate9",
        alignItems: "center",
        justifyContent: "center",
        borderLeft: "2px solid $slate7",
        cursor: "pointer",
        ...(active && { bg: "$blue9" }),
      }}
    >
      <div className="flex gap-4 items-center">
        <div className="flex flex-col">
          <span className="font-mono">{action.name}</span>
        </div>
      </div>
      {action.shortcut?.length ? (
        <div className="grid grid-flow-col gap-2">
          {action.shortcut.map((shortcut) => {
            return <kbd key={shortcut}>{shortcut}</kbd>;
          })}
        </div>
      ) : null}
    </Flex>
  );
});

ResultItem.displayName = "ResultItem";
