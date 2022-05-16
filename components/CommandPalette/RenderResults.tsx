/* eslint-disable react/no-unstable-nested-components */

import { Box } from "@components/Box";
import { Separator } from "@components/Separator";
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
          <Box css={{ padding: "$2 $3" }}>
            <Text
              as="h2"
              css={{ borderLeft: "2px solid transparent" }}
              fontFamily="mono"
              size="1"
              variant="subtle"
            >
              {item}
            </Text>
            <Separator css={{ mt: "$2" }} size="full" />
          </Box>
        ) : (
          <ResultItem action={item} active={active} />
        );
      }}
    />
  );
}
