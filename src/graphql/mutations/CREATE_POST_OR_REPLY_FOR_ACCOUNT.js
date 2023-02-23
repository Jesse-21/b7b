import { gql } from "@apollo/client";
import { CORE_COMMENT_FIELDS } from "../fragments/CORE_COMMENT_FIELDS";
import { CORE_POST_FIELDS } from "../fragments/CORE_POST_FIELDS";

export const CREATE_POST_OR_REPLY_FOR_ACCOUNT = gql`
  ${CORE_COMMENT_FIELDS}
  ${CORE_POST_FIELDS}

  mutation CREATE_POST_OR_REPLY_FOR_ACCOUNT(
    $parentId: ID
    $communityId: ID
    $channelId: ID
    $contentRaw: String
    $contentJson: String
    $contentHtml: String
    $blocks: [RichContentBlockInput!]
    $isReply: Boolean!
  ) {
    createPostOrReplyForAccount(
      parentId: $parentId
      communityId: $communityId
      contentRaw: $contentRaw
      contentJson: $contentJson
      contentHtml: $contentHtml
      channelId: $channelId
      blocks: $blocks
    ) {
      code
      success
      message
      post {
        ...CorePostFields
        ...CoreCommentFields @include(if: $isReply)
      }
    }
  }
`;
