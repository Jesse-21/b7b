/* eslint-disable no-inline-comments */
import React from "react";
import { useMutation } from "@apollo/client";

import { ObjectId } from "../make-object-id";
import { REACT_FOR_POST } from "../../graphql/mutations/REACT_FOR_POST";

export const usePostReaction = () => {
  const [_reactForPost, { loading: reactionLoading, error: reactionError }] =
    useMutation(REACT_FOR_POST);

  const reactForPost = React.useCallback(
    ({ postId, reactionType, reactionCount, amount }) => {
      if (!reactionType || !postId) return;
      _reactForPost({
        variables: {
          reactionType,
          postId,
          amount,
        },
        optimisticResponse: {
          reactForPost: {
            code: 200,
            success: true,
            message: "",
            accountReaction: {
              _id: `AccountReaction:${JSON.stringify({
                reactionObject: {
                  _id: postId,
                },
              })}`,
              __typename: "AccountReaction",
              reactionObject: {
                _id: postId,
                __typename: "Post",
                reactionCount: reactionCount + (amount || 1),
              },
              reactionObjectType: "POST",
              reactions: {
                _id: ObjectId(),
                likes: reactionCount + (amount || 1),
                __typename: "Reaction",
              },
            },
          },
        },
        update: (cache, { data: { reactForPost: reactForPostData } }) => {
          if (reactForPostData.success) {
            /** Modify existing Account Reaction */
            cache.modify({
              id: `AccountReaction:${JSON.stringify({
                reactionObject: {
                  _id: reactForPostData.accountReaction.reactionObject._id,
                },
              })}`,
              fields: {
                reactions(existingReactions = {}) {
                  return {
                    ...existingReactions,
                    ...reactForPostData.accountReaction.reactions,
                  };
                },
              },
            });
          }
        },
      });
    },
    [_reactForPost]
  );

  /** Variables */
  const loading = reactionLoading;

  const error = reactionError;

  return {
    reactForPost,
    loading,
    error,
  };
};
