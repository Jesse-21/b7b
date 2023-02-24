import { gql } from "@apollo/client";

export const GET_COMMUNITY_TOKEN_OWNER_ADDRESS = gql`
  query GET_COMMUNITY_TOKEN_OWNER_ADDRESS(
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
        tokenId
        tokenOwnerAddress
      }
    }
  }
`;
