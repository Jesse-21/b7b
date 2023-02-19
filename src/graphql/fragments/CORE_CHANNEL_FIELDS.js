import { gql } from "@apollo/client";

export const CORE_CHANNEL_FIELDS = gql`
  fragment CoreChannelFields on Channel {
    _id
    name
    slug
  }
`;
