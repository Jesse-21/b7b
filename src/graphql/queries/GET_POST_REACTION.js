import { gql } from "@apollo/client";

export const GET_POST_REACTION = gql`
  query GET_POST_REACTION($id: ID!) {
    getPost(id: $id) {
      _id
      reactionCount
    }
  }
`;
