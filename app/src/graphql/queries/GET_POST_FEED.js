import { gql } from "@apollo/client";

import { CORE_POST_FIELDS } from "../fragments/CORE_POST_FIELDS";

/** Get detailed info about a thread */
export const GET_POST_FEED = gql`
  ${CORE_POST_FIELDS}
  query GET_POST_FEED(
    $limit: Int
    $offset: Int
    $filters: PostFilter
    $sort: String
  ) {
    getPostFeed(
      limit: $limit
      offset: $offset
      filters: $filters
      sort: $sort
    ) {
      ...CorePostFields
    }
  }
`;
