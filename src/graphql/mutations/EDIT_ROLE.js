import { gql } from "@apollo/client";
import { CORE_ROLE_FIELDS } from "../fragments/CORE_ROLE_FIELDS";

export const EDIT_ROLE = gql`
  ${CORE_ROLE_FIELDS}
  mutation EDIT_ROLE($roleId: ID!, $roleInput: RoleInput) {
    editRole(roleId: $roleId, roleInput: $roleInput) {
      code
      success
      message
      role {
        ...CoreRoleFields
      }
    }
  }
`;
