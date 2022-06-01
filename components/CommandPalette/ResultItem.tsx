import { Flex } from "@components/Flex";
import { Kbd } from "@components/Kbd";
import { Stack } from "@components/Stack";
import { Text } from "@components/Text";
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
        padding: "$3",
        backgroundColor: "$loContrast",
        alignItems: "center",
        justifyContent: "space-between",
        borderLeft: "2px solid transparent",
        cursor: "pointer",
        ...(active && {
          backgroundColor: "$slate4",
          borderLeft: "2px solid $slate8",
        }),
      }}
    >
      <Text fontFamily="mono" size="2">
        {action.name}
      </Text>
      {action.shortcut ? (
        <Stack css={{ stackGap: "$2", alignItems: "center" }} direction="row">
          {action.shortcut.map((shortcut) => {
            return (
              <Kbd key={shortcut} size="1">
                {shortcut}
              </Kbd>
            );
          })}
        </Stack>
      ) : null}
    </Flex>
  );
});

ResultItem.displayName = "ResultItem";
