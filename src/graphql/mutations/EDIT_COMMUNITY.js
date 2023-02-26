import { gql } from "@apollo/client";
import { CORE_COMMUNITY_FIELDS } from "../fragments/CORE_COMMUNITY_FIELDS";

export const EDIT_COMMUNITY = gql`
  ${CORE_COMMUNITY_FIELDS}
  mutation EDIT_COMMUNITY(
    $communityId: String!
    $name: String
    $imageId: String
    $bannerImageId: String
    $bio: ContentInput
  ) {
    editCommunity(
      communityId: $communityId
      name: $name
      imageId: $imageId
      bannerImageId: $bannerImageId
      bio: $bio
    ) {
      code
      success
      message
      community {
        ...CoreCommunityFields
      }
    }
  }
`;
