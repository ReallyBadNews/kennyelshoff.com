import useSWR from "swr";

import fetcher from "lib/fetcher";
// import MetricCard from "components/metrics/Card";

export type Unsplash = {
  downloads: number;
  views: number;
};

export default function UnsplashCard() {
  const { data } = useSWR<Unsplash>("/api/unsplash", fetcher);

  // const link = "https://unsplash.com/@reallybadnews";

  return (
    // <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 my-2 w-full">
    //   <MetricCard
    //     header="Unsplash Downloads"
    //     isCurrency={false}
    //     link={link}
    //     metric={data?.downloads}
    //   />
    //   <MetricCard
    //     header="Unsplash Views"
    //     isCurrency={false}
    //     link={link}
    //     metric={data?.views}
    //   />
    // </div>
    <>
      <div>yet to implement, here is some data</div>
      <pre>{data}</pre>
    </>
  );
}
