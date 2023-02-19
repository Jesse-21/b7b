import React from "react";
import { useQuery } from "@apollo/client";

import { GET_POST_FEED } from "../graphql/queries/GET_POST_FEED";

export const PostFeedContext = React.createContext({
  postFeed: [],
  isEnd: false,
  loading: false,
  error: null,
});
PostFeedContext.displayName = "PostFeedContext";

export const usePostFeedContext = () => React.useContext(PostFeedContext);

export const PostFeedContextProvider = ({ children, limit, sort, filters }) => {
  const [isEnd, setIsEnd] = React.useState(false);
  //   const [refreshLoading, setRefreshLoading] = React.useState(false);

  const { data, loading, error } = useQuery(GET_POST_FEED, {
    variables: {
      filters,
      sort,
      limit,
    },
  });

  const postFeed = React.useMemo(() => {
    return data?.getPostFeed;
  }, [data]);

  return (
    <PostFeedContext.Provider
      value={{
        postFeed,
        isEnd,
        loading,
        error,
      }}
    >
      {children}
    </PostFeedContext.Provider>
  );
};
