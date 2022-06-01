/* eslint-disable react/no-unstable-nested-components */

import { Box } from "@components/Box";
import { Text } from "@components/Text";
import { KBarResults, useMatches } from "kbar";
import { ResultItem } from "./ResultItem";

export function RenderResults() {
  const { results } = useMatches();

  return (
    <KBarResults
      items={results}
      onRender={({ item, active }) => {
        return typeof item === "string" ? (
          <Box css={{ paddingTop: "$3" }}>
            <Text
              as="h2"
              css={{
                borderLeft: "2px solid transparent",
                borderTop: "1px solid $slate5",
                borderBottom: "1px solid $slate5",
                padding: "$3",
              }}
              fontFamily="mono"
              size="1"
              variant="subtle"
            >
              {item.toUpperCase()}
            </Text>
          </Box>
        ) : (
          <ResultItem action={item} active={active} />
        );
      }}
    />
  );
}
