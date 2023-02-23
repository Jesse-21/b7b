import React from "react";
import { useQuery } from "@apollo/client";

import { PostFooter } from "../../components/post/PostFooter";

import { GET_POST_COMMENT_COUNT } from "../../graphql/queries/GET_POST_COMMENT_COUNT";

const withPostFooterAction = (Component) => {
  const Memo = React.memo(Component);

  // eslint-disable-next-line react/display-name
  return ({ postId, index, postLink, ...props }) => {
    const { data } = useQuery(GET_POST_COMMENT_COUNT, {
      variables: {
        id: postId,
      },
      skip: !postId,
    });

    const onPostCommentClick = React.useCallback(
      (e) => {
        e.preventDefault();
        if (!postLink) {
          // @TODO scroll to comment
        } else {
          window.location.href = postLink;
        }
      },
      [postLink]
    );

    const commentCount = React.useMemo(() => {
      return index === 0
        ? data?.getPost?.rootCommentCount
        : data?.getPost?.commentCount;
    }, [data, index]);

    return (
      <Memo
        commentCount={commentCount}
        size="sm"
        postLink={postLink}
        onPostCommentClick={onPostCommentClick}
        index={index}
        {...props}
      />
    );
  };
};

export const PostFooterWithAction = withPostFooterAction(PostFooter);
