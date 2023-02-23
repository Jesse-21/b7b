import { gql } from "@apollo/client";

export const CORE_ACCOUNT_REACTION_FIELDS = gql`
  fragment CoreAccountReactionFields on AccountReaction {
    _id
    reactionObject {
      ... on Post {
        _id
        reactionCount
      }
    }
    reactions {
      _id
      likes
    }
  }
`;
