import { gql } from "@apollo/client";

export const CORE_RICH_CONTENT_FIELDS = gql`
  fragment CoreRichContentFields on RichContent {
    _id
    content {
      raw
      html
    }
    blocks {
      id
      blockType
      block {
        ... on ImageUnion {
          _id
          image {
            _id
            src
            isVerified
            name
          }
          type
        }
        ... on LinkUnion {
          _id
          link {
            _id
            url
            image
            title
            description
            iframe
          }
          type
        }
        ... on RichEmbedUnion {
          _id
          richEmbed {
            _id
            title
            url
            color
            timestamp
            description {
              raw
              html
            }
            thumbnail {
              _id
              src
              isVerified
              name
            }
            image {
              _id
              src
              isVerified
              name
            }
            fields {
              _id
              key
              value
            }
          }
          type
        }
      }
    }
  }
`;
