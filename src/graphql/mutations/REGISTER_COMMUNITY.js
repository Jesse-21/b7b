import { gql } from "@apollo/client";
import { CORE_COMMUNITY_FIELDS } from "../fragments/CORE_COMMUNITY_FIELDS";

export const REGISTER_COMMUNITY = gql`
  ${CORE_COMMUNITY_FIELDS}
  mutation REGISTER_COMMUNITY($bebdomain: String!, $tld: String) {
    registerCommunity(bebdomain: $bebdomain, tld: $tld) {
      code
      success
      message
      community {
        ...CoreCommunityFields
      }
    }
  }
`;
