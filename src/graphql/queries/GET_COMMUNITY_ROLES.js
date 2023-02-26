import { gql } from "@apollo/client";

import { CORE_ROLE_FIELDS } from "../fragments/CORE_ROLE_FIELDS";

export const GET_COMMUNITY_ROLES = gql`
  ${CORE_ROLE_FIELDS}
  query GET_COMMUNITY_ROLES($id: ID!) {
    CommunityQuery {
      getCommunityById(id: $id) {
        _id
        tokenId
        roles {
          ...CoreRoleFields
        }
      }
    }
  }
`;
