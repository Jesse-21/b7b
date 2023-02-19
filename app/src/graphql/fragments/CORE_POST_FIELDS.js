import { gql } from "@apollo/client";

import { CORE_ACCOUNT_FIELDS } from "./CORE_ACCOUNT_FIELDS";
import { CORE_CHANNELS_FIELDS } from "./CORE_CHANNELS_FIELDS";
import { CORE_RICH_CONTENT_FIELDS } from "./CORE_RICH_CONTENT_FIELDS";

export const CORE_POST_FIELDS = gql`
  ${CORE_ACCOUNT_FIELDS}
  ${CORE_RICH_CONTENT_FIELDS}
  ${CORE_CHANNELS_FIELDS}
  fragment CorePostFields on Post {
    _id
    createdAt
    reactionCount
    commentCount
    rootCommentCount
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
      tld
    }
    channel {
      ...CoreChannelFields
    }
    # currentAccountPermissions {
    #   _id
    #   canRead
    # }
    parent {
      _id
      account {
        _id
        username
      }
    }
  }
`;
