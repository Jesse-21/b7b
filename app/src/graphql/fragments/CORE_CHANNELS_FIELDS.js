import { gql } from "@apollo/client";

export const CORE_CHANNELS_FIELDS = gql`
  fragment CoreChannelFields on Channel {
    _id
    name
    slug
  }
`;
