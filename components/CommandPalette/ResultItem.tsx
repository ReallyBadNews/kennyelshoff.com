import { Flex } from "@components/Flex";
import { Kbd } from "@components/Kbd";
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
      css={{
        px: "$4",
        py: "$2",
        backgroundColor: "$loContrast",
        alignItems: "center",
        justifyContent: "space-between",
        borderLeft: "4px solid transparent",
        cursor: "pointer",
        ...(active && {
          backgroundColor: "$slate4",
          borderLeft: "4px solid $slate7",
        }),
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
            return <Kbd key={shortcut}>{shortcut}</Kbd>;
          })}
        </div>
      ) : null}
    </Flex>
  );
});

ResultItem.displayName = "ResultItem";
