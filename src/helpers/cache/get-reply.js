import { client } from "../../apollo-client";

import { CORE_POST_REPLIES_FIELDS } from "../../graphql/fragments/CORE_POST_REPLIES_FIELDS";

/** Get reply from apollo client cache */
export const getReply = (postId) =>
  client.readFragment({
    id: `Post:${postId}`,
    fragment: CORE_POST_REPLIES_FIELDS,
    fragmentName: "CorePostRepliesFields",
  });
