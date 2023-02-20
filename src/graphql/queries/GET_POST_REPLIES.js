import { gql } from "@apollo/client";

import { CORE_POST_REPLIES_FIELDS } from "../fragments/CORE_POST_REPLIES_FIELDS";

/** Get replies for a post or comments */
export const GET_POST_REPLIES = gql`
  ${CORE_POST_REPLIES_FIELDS}
  query GET_POST_REPLIES($id: ID!, $limit: Int, $offset: Int) {
    getPost(id: $id) {
      ...CorePostRepliesFields
    }
  }
`;
