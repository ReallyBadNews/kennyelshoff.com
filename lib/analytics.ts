import { useRouter } from "next/router";
import { useEffect } from "react";
import * as Fathom from "fathom-client";

export const useAnalytics = () => {
  const router = useRouter();

  useEffect(() => {
    if (process.env.NODE_ENV === "production") {
      Fathom.load(process.env.NEXT_PUBLIC_FATHOM_SITE_ID as string, {
        includedDomains: [
          "kennyelshoff.com",
          "www.kennyelshoff.com",
          "badnews.dev",
          "www.badnews.dev",
        ],
        url: "https://boop.kennyelshoff.com/script.js",
      });
    }

    function onRouteChangeComplete() {
      Fathom.trackPageview();
    }

    router.events.on("routeChangeComplete", onRouteChangeComplete);

    return () => {
      router.events.off("routeChangeComplete", onRouteChangeComplete);
    };
  }, [router.events]);
};
