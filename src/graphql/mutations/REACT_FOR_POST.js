import { gql } from "@apollo/client";

import { CORE_ACCOUNT_REACTION_FIELDS } from "../fragments/CORE_ACCOUNT_REACTION_FIELDS";

export const REACT_FOR_POST = gql`
  ${CORE_ACCOUNT_REACTION_FIELDS}
  mutation REACT_FOR_POST($postId: ID!, $reactionType: String!, $amount: Int) {
    reactForPost(
      postId: $postId
      reactionType: $reactionType
      amount: $amount
    ) {
      code
      success
      message
      accountReaction {
        ...CoreAccountReactionFields
      }
    }
  }
`;
