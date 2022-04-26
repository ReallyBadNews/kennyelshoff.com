import NextLink from "@components/NextLink";
import { Stack } from "@components/Stack";
import { Text } from "@components/Text";

interface MetricCardProps {
  header: string;
  url?: string;
  metric?: number;
}

export default function MetricCard({ header, url, metric }: MetricCardProps) {
  return (
    <Stack
      css={{
        stackGap: "$1",
        borderRadius: "$lg",
        p: "$2 $3",
        position: "relative",
        border: url ? undefined : "1px solid $slate4",
      }}
    >
      {url ? (
        <NextLink href={url} outline="always" variant="transparent">
          <Text css={{ lineHeight: "$snug" }} fontFamily="mono" size="2">
            {header}
          </Text>
        </NextLink>
      ) : (
        <Text css={{ lineHeight: "$snug" }} fontFamily="mono" size="2">
          {header}
        </Text>
      )}
      <Text css={{ fontWeight: "$9", lineHeight: "$none" }} size="6">
        {metric ? ` ${metric.toLocaleString()}` : "——"}
      </Text>
    </Stack>
  );
}

MetricCard.defaultProps = {
  metric: undefined,
  url: undefined,
};
