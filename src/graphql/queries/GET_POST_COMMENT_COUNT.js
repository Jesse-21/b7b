import { gql } from "@apollo/client";

export const GET_POST_COMMENT_COUNT = gql`
  query GET_POST_COMMENT_COUNT($id: ID!) {
    getPost(id: $id) {
      _id
      commentCount
      rootCommentCount
    }
  }
`;
