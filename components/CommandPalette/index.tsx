import {
  KBarAnimator,
  KBarPortal,
  KBarProvider,
  KBarResults,
  KBarSearch,
} from "kbar";

export default function CommandPalette({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <KBarProvider>
      <KBarPortal>
        <KBarAnimator>
          <KBarSearch placeholder="Type a command or search…" />
          <RenderResults />
        </KBarAnimator>
      </KBarPortal>
    </KBarProvider>
  );
}

function RenderResults() {
  const { results } = useMatches();

  return (
    <KBarResults
      items={results}
      onRender={({ item, active }) => {
        return typeof item === "string" ? (
          <h2
            className={cx(
              "border-l-2 px-4 pt-4 pb-2 text-sm font-mono uppercase tracking-wider text-opacity-75",
              "text-gray-600",
              "dark:text-gray-300"
            )}
            style={{
              borderColor: "transparent",
            }}
          >
            {item}
          </h2>
        ) : (
          <ResultItem action={item} active={active} />
        );
      }}
    />
  );
}
