import { gql } from "@apollo/client";
import { CORE_ACCOUNT_FIELDS } from "../fragments/CORE_ACCOUNT_FIELDS";

export const PRIVATE_ACCOUNT_FIELDS = gql`
  ${CORE_ACCOUNT_FIELDS}
  fragment PrivateAccountFields on Account {
    ...CoreAccountFields
    nonces {
      _id
      nonce
      transactionNonce
    }
    activities {
      isOnboarded
      isWhitelisted
    }
    hasPremiumRole
  }
`;
