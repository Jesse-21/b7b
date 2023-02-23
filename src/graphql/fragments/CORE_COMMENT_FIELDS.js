import { gql } from "@apollo/client";

import { CORE_ACCOUNT_FIELDS } from "./CORE_ACCOUNT_FIELDS";
import { CORE_RICH_CONTENT_FIELDS } from "./CORE_RICH_CONTENT_FIELDS";

/** A comment is a post with a parent */
export const CORE_COMMENT_FIELDS = gql`
  ${CORE_ACCOUNT_FIELDS}
  ${CORE_RICH_CONTENT_FIELDS}
  fragment CoreCommentFields on Post {
    _id
    createdAt
    isHidden
    richContent {
      ...CoreRichContentFields
    }
    account {
      ...CoreAccountFields
    }
    community {
      _id
      name
      bebdomain
    }
    parent {
      _id
      account {
        ...CoreAccountFields
      }
    }
  }
`;
