import { gql } from "@apollo/client";

export const CORE_ROLE_FIELDS = gql`
  fragment CoreRoleFields on Role {
    _id
    slug
    description {
      raw
    }
    name
    editable
    icon {
      _id
      src
    }
    isManagedByIndexer
    permissionString
    membersCount
    editable
  }
`;
