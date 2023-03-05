import { Helmet } from "react-helmet";

export const DimensionHead = ({ community }) => {
  return (
    <Helmet>
      <title>{community?.name}</title>
      <meta name="description" content={community?.description?.raw} />

      <meta property="og:title" content={community?.name} />
      <meta property="og:description" content={community?.description?.raw} />
      <meta property="og:image" content={community?.image?.src} />
      <meta
        property="og:url"
        content={`https://b7b.xyz/${community?.bebdomain}`}
      />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="B7B" />
    </Helmet>
  );
};
