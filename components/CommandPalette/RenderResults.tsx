/* eslint-disable react/no-unstable-nested-components */

import { Box } from "@components/Box";
import { Heading } from "@components/Heading";
import { KBarResults, useMatches } from "kbar";
import { ResultItem } from "./ResultItem";

export function RenderResults() {
  const { results } = useMatches();

  return (
    <KBarResults
      items={results}
      onRender={({ item, active }) => {
        return typeof item === "string" ? (
          <Box css={{ p: "$2 $4" }}>
            <Heading as="h2" size="2">
              {item}
            </Heading>
          </Box>
        ) : (
          <ResultItem action={item} active={active} />
        );
      }}
    />
  );
}
