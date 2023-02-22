import { gql } from "@apollo/client";
import { PRIVATE_ACCOUNT_FIELDS } from "../fragments/PRIVATE_ACCOUNT_FIELDS";

export const AUTH_BY_SIGNATURE = gql`
  ${PRIVATE_ACCOUNT_FIELDS}
  mutation AUTH_BY_SIGNATURE(
    $address: String!
    $chainId: Int!
    $signature: String!
  ) {
    authBySignature(
      address: $address
      chainId: $chainId
      signature: $signature
    ) {
      code
      success
      message
      account {
        ...PrivateAccountFields
      }
      accessToken
    }
  }
`;
