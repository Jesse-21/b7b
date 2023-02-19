/* eslint-disable no-inline-comments */
import { useLazyQuery } from "@apollo/client";

import { GET_POST_FEED } from "../../graphql/queries/GET_POST_FEED";

export const usePostFeed = () => {
  const [
    _getPostFeed,
    {
      loading: getPostFeedLoading,
      error: getPostFeedError,
      data: postFeedData,
      fetchMore,
    },
  ] = useLazyQuery(GET_POST_FEED);

  const getPostFeed = ({ limit = 20, offset = 0, filters = {}, sort } = {}) => {
    return _getPostFeed({
      variables: {
        limit,
        offset,
        filters,
        sort,
      },
    });
  };
  /** Variables */
  const postFeedLoading = getPostFeedLoading;

  const postFeedError = getPostFeedError;

  return {
    getPostFeed,
    fetchMore,
    loading: postFeedLoading,
    error: postFeedError,
    postFeed: postFeedData?.getPostFeed,
  };
};
