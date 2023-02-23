import { GET_POST_FEED } from "../../graphql/queries/GET_POST_FEED";

// Get postFeed from cache
export const getPostFeed = ({ filters, limit, offset, client }) => {
  return client.readQuery({
    query: GET_POST_FEED,
    variables: {
      filters,
      limit,
      offset,
    },
  });
};
