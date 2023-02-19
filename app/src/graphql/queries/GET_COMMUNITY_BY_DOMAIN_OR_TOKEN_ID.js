import { gql } from "@apollo/client";

import { CORE_COMMUNITY_FIELDS } from "../fragments/CORE_COMMUNITY_FIELDS";

export const GET_COMMUNITY_BY_DOMAIN_OR_TOKEN_ID = gql`
  ${CORE_COMMUNITY_FIELDS}
  query GET_COMMUNITY_BY_DOMAIN(
    $bebdomain: String
    $tokenId: String
    $tld: String
  ) {
    CommunityQuery {
      _id
      getCommunityByDomainOrTokenId(
        bebdomain: $bebdomain
        tokenId: $tokenId
        tld: $tld
      ) {
        ...CoreCommunityFields
      }
    }
  }
`;
