import { Grid } from "@components/Grid";
import { useUnsplashStats } from "@hooks/use-unsplash";
import MetricCard from "./Card";

export default function UnsplashStats() {
  const { data } = useUnsplashStats();

  const link = "https://unsplash.com/@reallybadnews";

  return (
    <Grid columns={{ "@initial": 1, "@bp1": 2 }} gap="3">
      <MetricCard header="Unsplash Views" metric={data?.views} url={link} />
      <MetricCard
        header="Unsplash Downloads"
        metric={data?.downloads}
        url={link}
      />
    </Grid>
  );
}
