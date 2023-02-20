import { gql } from "@apollo/client";

import { CORE_POST_FIELDS } from "../fragments/CORE_POST_FIELDS";

/** Get detailed info about a post or comment
 * @TODO add comments fragment?
 */
export const GET_POST = gql`
  ${CORE_POST_FIELDS}
  query GET_POST($id: ID!) {
    getPost(id: $id) {
      ...CorePostFields
    }
  }
`;
