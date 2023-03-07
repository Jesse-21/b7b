import { gql } from "@apollo/client";

export const GET_COMMUNITY_ID_BY_DOMAIN_OR_TOKEN_ID = gql`
  query GET_COMMUNITY_ID_BY_DOMAIN($bebdomain: String, $tld: String) {
    CommunityQuery {
      _id
      getCommunityByDomainOrTokenId(bebdomain: $bebdomain, tld: $tld) {
        _id
        tokenId
      }
    }
  }
`;
