/* eslint-disable react/no-unstable-nested-components */

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
          <Heading as="h2" /* style={{ borderColor: "transparent" }} */>
            {item}
          </Heading>
        ) : (
          <ResultItem action={item} active={active} />
        );
      }}
    />
  );
}
