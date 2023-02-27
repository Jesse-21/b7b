import { gql } from "@apollo/client";

export const DELETE_ROLE = gql`
  mutation DELETE_ROLE($roleId: ID!) {
    deleteRole(roleId: $roleId) {
      code
      success
      message
      roleId
    }
  }
`;
