import { gql } from "@apollo/client";
import { PRIVATE_ACCOUNT_FIELDS } from "../fragments/PRIVATE_ACCOUNT_FIELDS";

export const UPDATE_CURRENT_ACCOUNT = gql`
  ${PRIVATE_ACCOUNT_FIELDS}
  mutation UPDATE_CURRENT_ACCOUNT(
    $email: String
    $username: String
    $location: String
    $profileImageId: String
    $bio: String
  ) {
    updateCurrentAccount(
      username: $username
      location: $location
      email: $email
      profileImageId: $profileImageId
      bio: $bio
    ) {
      code
      success
      message
      account {
        ...PrivateAccountFields
      }
    }
  }
`;
