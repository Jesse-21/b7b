import { gql } from "@apollo/client";

import { CORE_CHANNEL_FIELDS } from "../fragments/CORE_CHANNEL_FIELDS";

export const GET_CHANNEL = gql`
  ${CORE_CHANNEL_FIELDS}
  query GET_CHANNEL($id: ID!) {
    ChannelQuery {
      _id
      getChannelById(id: $id) {
        ...CoreChannelFields
        currentAccountPermissions {
          canRead
          canWrite
        }
      }
    }
  }
`;
