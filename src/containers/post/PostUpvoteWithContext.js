import React from "react";
import { useQuery } from "@apollo/client";

import { PostUpvote } from "../../components/post/PostUpvote";

import { GET_REACTION_BY_ACCOUNT_AND_OBJECT_ID } from "../../graphql/queries/GET_REACTION_BY_ACCOUNT_AND_OBJECT_ID";
import { GET_POST_REACTION } from "../../graphql/queries/GET_POST_REACTION";

import { usePostReaction } from "../../helpers/hooks/usePostReaction";

const withPostReactionActions = (Component) => {
  const Memo = React.memo(Component);

  // eslint-disable-next-line react/display-name
  return ({ postId, ...props }) => {
    const { reactForPost } = usePostReaction();
    const { data } = useQuery(GET_REACTION_BY_ACCOUNT_AND_OBJECT_ID, {
      variables: {
        reactionObjectType: "POST",
        reactionObjectTypeId: postId,
      },
      skip: !postId,
    });

    const { data: postReactionData } = useQuery(GET_POST_REACTION, {
      variables: {
        id: postId,
      },
      skip: !postId,
    });

    const currentLikes = React.useMemo(() => {
      return data?.getReactionByAccountAndObjectId?.reactions?.likes;
    }, [data]);

    const reactionCount = React.useMemo(() => {
      return postReactionData?.getPost?.reactionCount;
    }, [postReactionData]);

    const onPostLike = React.useCallback(
      (e, amount) => {
        e.preventDefault();
        e.stopPropagation();
        reactForPost({
          reactionType: "LIKES",
          postId: postId,
          amount: parseInt(amount || "0"),
          reactionCount: (reactionCount || 0) - (currentLikes || 0),
        });
      },
      [postId, reactionCount, currentLikes]
    );
    return (
      <Memo
        {...props}
        reactionCount={reactionCount}
        onPostLike={onPostLike}
        currentLikes={currentLikes}
      />
    );
  };
};

export const PostUpvoteWithActions = withPostReactionActions(PostUpvote);
