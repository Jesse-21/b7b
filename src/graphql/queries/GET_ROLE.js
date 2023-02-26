import { gql } from "@apollo/client";

import { CORE_ROLE_FIELDS } from "../fragments/CORE_ROLE_FIELDS";

export const GET_ROLE = gql`
  ${CORE_ROLE_FIELDS}
  query GET_ROLE($id: ID) {
    RoleQuery {
      _id
      getRoleById(id: $id) {
        ...CoreRoleFields
      }
    }
  }
`;
