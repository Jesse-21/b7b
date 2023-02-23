import { client } from "../../apollo-client";

import { CORE_COMMUNITY_FIELDS } from "../../graphql/fragments/CORE_COMMUNITY_FIELDS";

/** Get community from apollo client cache */
export const getCommunity = (communityId) =>
  client.readFragment({
    id: `Community:${communityId}`,
    fragment: CORE_COMMUNITY_FIELDS,
    fragmentName: "CoreCommunityFields",
  });
