/* eslint-disable no-inline-comments */
import React from "react";
import { useMutation } from "@apollo/client";

import { ObjectId } from "../make-object-id";
import { REACT_FOR_POST } from "../../graphql/mutations/REACT_FOR_POST";
import { GET_REACTION_BY_ACCOUNT_AND_OBJECT_ID } from "../../graphql/queries/GET_REACTION_BY_ACCOUNT_AND_OBJECT_ID";

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
        // updateQueries: [
        //   "GET_REACTION_BY_ACCOUNT_AND_OBJECT_ID",
        //   "GET_POST_REACTION",
        // ],
        update: (cache, { data: { reactForPost: reactForPostData } }) => {
          if (reactForPostData.success) {
            /** Modify existing Account Reaction */
            cache.writeQuery({
              query: GET_REACTION_BY_ACCOUNT_AND_OBJECT_ID,
              variables: {
                reactionObjectType: "POST",
                reactionObjectTypeId: postId,
              },
              data: {
                getReactionByAccountAndObjectId: {
                  _id: reactForPostData.accountReaction._id,
                  reactionObject:
                    reactForPostData.accountReaction.reactionObject,
                  reactions: reactForPostData.accountReaction.reactions,
                  __typename: "AccountReaction",
                },
              },
            });
            if (
              reactForPostData.accountReaction.reactionObject?.__typename ===
              "Post"
            ) {
              /** Modify existing Post reaction count */
              cache.modify({
                id: `Post:${reactForPostData.accountReaction.reactionObject._id}`,
                fields: {
                  reactionCount() {
                    return reactForPostData.accountReaction.reactionObject
                      .reactionCount;
                  },
                },
              });
            }
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
