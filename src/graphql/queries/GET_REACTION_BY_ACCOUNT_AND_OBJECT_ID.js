import { gql } from "@apollo/client";

import { CORE_ACCOUNT_REACTION_FIELDS } from "../fragments/CORE_ACCOUNT_REACTION_FIELDS";

/** Get current account's reaction to an objectType i.e post */
export const GET_REACTION_BY_ACCOUNT_AND_OBJECT_ID = gql`
  ${CORE_ACCOUNT_REACTION_FIELDS}
  query GET_REACTION_BY_ACCOUNT_AND_OBJECT_ID(
    $reactionObjectType: String!
    $reactionObjectTypeId: ID!
  ) {
    getReactionByAccountAndObjectId(
      reactionObjectType: $reactionObjectType
      reactionObjectTypeId: $reactionObjectTypeId
    ) {
      ...CoreAccountReactionFields
    }
  }
`;
