import { gql } from "@apollo/client";
import { CORE_ACCOUNT_FIELDS } from "./CORE_ACCOUNT_FIELDS";

export const CORE_COMMUNITY_FIELDS = gql`
  ${CORE_ACCOUNT_FIELDS}
  fragment CoreCommunityFields on Community {
    _id
    name
    description
    bebdomain
    bio {
      raw
      html
    }
    image {
      src
      isVerified
      verificationExternalUrl
    }
    bannerImage {
      src
    }
    owner {
      ...CoreAccountFields
    }
    membersCount
    tld
    tokenId
  }
`;
