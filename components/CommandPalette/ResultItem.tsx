import { Flex } from "@components/Flex";
import { Kbd } from "@components/Kbd";
import { Stack } from "@components/Stack";
import { Text } from "@components/Text";
import { Action } from "kbar";
import React, { Fragment } from "react";

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
      {action.shortcut?.length ? (
        <Stack css={{ stackGap: "$2", alignItems: "center" }} direction="row">
          {action.shortcut.map((shortcut, index) => {
            return (
              <Fragment key={shortcut}>
                <Kbd size="2">{shortcut}</Kbd>
                {action.shortcut?.length
                  ? action.shortcut.length - 1 !== index && (
                      <Text size="2" variant="subtle">
                        +
                      </Text>
                    )
                  : null}
              </Fragment>
            );
          })}
        </Stack>
      ) : null}
    </Flex>
  );
});

ResultItem.displayName = "ResultItem";
