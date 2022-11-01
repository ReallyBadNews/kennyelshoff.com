import Head from "next/head";
import { useRouter } from "next/router";

type HelmetProps = {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  pathname?: string;
};

export const Helmet: React.FC<HelmetProps> = ({
  title,
  // TODO: Update description
  description = "Detail oriented user interface engineer currently interested in CSS architecture, React, TypeScript, design systems, and state machines.",
  image,
  url = "https://kennyelshoff.com",
  pathname,
}) => {
  const { pathname: routerPathName } = useRouter();

  const metaTitle = `${title ? `${title} - ` : ""}Kenny Elshoff`;
  const imageUrl = `${url}/images/social/${image || "og-image.jpg"}`;
  const path = pathname || routerPathName;

  return (
    <Head>
      <title>{metaTitle}</title>
      <meta content={metaTitle} property="og:title" />
      <meta content="en" httpEquiv="Content-Language" />

      <meta content={description} name="description" />

      <meta content={description} property="og:description" />
      <meta content={imageUrl} property="og:image" />
      <meta content={`${url}${path}`} property="og:url" />
      <meta content="website" property="og:type" />

      <meta content="@kennyelshoff" name="twitter:site" />
      <meta content="summary_large_image" name="twitter:card" />
      <meta content="Kenny Elshoff" name="author" />

      <meta content="var(--hiContrast)" name="theme-color" />
      <link href="/meta-image.png" rel="apple-touch-icon" sizes="180x180" />
      <link href="/favicon.ico" rel="icon" type="image/svg+xml" />
    </Head>
  );
};

Helmet.defaultProps = {
  title: undefined,
  description: undefined,
  image: undefined,
  url: undefined,
  pathname: undefined,
};
