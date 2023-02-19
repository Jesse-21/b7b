import React from "react";
import { useParams } from "react-router-dom";

import { PostFeedWithContext } from "../containers/post/PostFeedWithContext";
import { CommunityContextProvider } from "../context/CommunityContext";

const withDimensionContext = (Component) => {
  const Memo = React.memo(Component);

  // eslint-disable-next-line react/display-name
  return () => {
    const { dimension } = useParams();
    const domain = React.useMemo(() => {
      return dimension?.split(".")?.[0];
    }, [dimension]);
    const tld = React.useMemo(() => {
      return dimension?.split(".")?.[1];
    }, [dimension]);
    return (
      <CommunityContextProvider domain={domain} tld={tld}>
        <Memo />
      </CommunityContextProvider>
    );
  };
};
const DimensionContent = () => {
  return <PostFeedWithContext></PostFeedWithContext>;
};

export const Dimension = withDimensionContext(DimensionContent);
