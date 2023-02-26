import { gql } from "@apollo/client";

export const CORE_PERMISSION_FIELDS = gql`
  fragment CorePermissionFields on Permission {
    _id
    description {
      raw
    }
    name
    editable
    bitwiseFlag
  }
`;
