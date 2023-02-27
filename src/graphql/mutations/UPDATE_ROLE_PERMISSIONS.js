import { gql } from "@apollo/client";
import { CORE_ROLE_FIELDS } from "../fragments/CORE_ROLE_FIELDS";

export const UPDATE_ROLE_PERMISSIONS = gql`
  ${CORE_ROLE_FIELDS}
  mutation UPDATE_ROLE_PERMISSIONS($roleId: ID!, $permissionIds: [String]) {
    updateRolePermissions(roleId: $roleId, permissionIds: $permissionIds) {
      code
      success
      message
      role {
        ...CoreRoleFields
      }
    }
  }
`;
