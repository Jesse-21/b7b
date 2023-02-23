import { client } from "../../apollo-client";

import { CORE_POST_FIELDS } from "../../graphql/fragments/CORE_POST_FIELDS";

/** Get post from apollo client cache */
export const getPost = (postId) =>
  client.readFragment({
    id: `Post:${postId}`,
    fragment: CORE_POST_FIELDS,
    fragmentName: "CorePostFields",
  });
