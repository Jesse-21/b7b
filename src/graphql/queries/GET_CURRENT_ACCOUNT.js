import { gql } from "@apollo/client";
import { PRIVATE_ACCOUNT_FIELDS } from "../fragments/PRIVATE_ACCOUNT_FIELDS";

export const GET_CURRENT_ACCOUNT = gql`
  ${PRIVATE_ACCOUNT_FIELDS}
  query GET_CURRENT_ACCOUNT {
    getCurrentAccount {
      ...PrivateAccountFields
    }
  }
`;
