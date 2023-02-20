import { gql } from "@apollo/client";

import { CORE_COMMENT_FIELDS } from "./CORE_COMMENT_FIELDS";

export const CORE_POST_REPLIES_FIELDS = gql`
  ${CORE_COMMENT_FIELDS}
  fragment CorePostRepliesFields on Post {
    _id
    replies(limit: $limit, offset: $offset) {
      ...CoreCommentFields
    }
  }
`;
