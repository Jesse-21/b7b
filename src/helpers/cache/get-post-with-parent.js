import { client } from "../../apollo-client";

import { CORE_COMMENT_FIELDS } from "../../graphql/fragments/CORE_COMMENT_FIELDS";

/** Get post from apollo client cache */
export const getPostWithParent = (postId) =>
  client.readFragment({
    id: `Post:${postId}`,
    fragment: CORE_COMMENT_FIELDS,
    fragmentName: "CoreCommentFields",
  });
