import { gql } from "@apollo/client";

import { CORE_PERMISSION_FIELDS } from "../fragments/CORE_PERMISSION_FIELDS";

export const GET_COMMUNITY_PERMISSIONS = gql`
  ${CORE_PERMISSION_FIELDS}
  query GET_COMMUNITY_PERMISSIONS($id: ID!) {
    CommunityQuery {
      getCommunityById(id: $id) {
        _id
        tokenId
        permissions {
          ...CorePermissionFields
        }
      }
    }
  }
`;
