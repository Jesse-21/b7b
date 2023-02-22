import { gql } from "@apollo/client";

/** Get message to sign */
export const GET_ACCOUNT_SIGNIN_MESSAGE = gql`
  query GET_ACCOUNT_SIGNIN_MESSAGE($address: String!, $chainId: Int!) {
    AccountQuery {
      _id
      getAccountSigninMessage(address: $address, chainId: $chainId)
    }
  }
`;
