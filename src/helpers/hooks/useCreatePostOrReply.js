/* eslint-disable no-inline-comments */
import { useMutation, useApolloClient } from "@apollo/client";

import { CREATE_POST_OR_REPLY_FOR_ACCOUNT } from "../../graphql/mutations/CREATE_POST_OR_REPLY_FOR_ACCOUNT";
import { CORE_POST_FIELDS } from "../../graphql/fragments/CORE_POST_FIELDS";
import { CORE_COMMENT_FIELDS } from "../../graphql/fragments/CORE_COMMENT_FIELDS";

import { makeOptimisticPost } from "../optimisticTemplates/post";

export const useCreatePostOrReply = () => {
  const [
    _createPostOrReply,
    { data, loading: createPostLoading, error: createPostError },
  ] = useMutation(CREATE_POST_OR_REPLY_FOR_ACCOUNT);
  const client = useApolloClient();

  const createPostOrReply = (variables = {}) => {
    const post = makeOptimisticPost({
      contentRaw: variables.contentRaw,
      contentHtml: variables.contentHtml,
      communityId: variables.communityId,
      parentId: variables.parentId,
      blocks: variables.blocks,
      channelId: variables.channelId,
      client,
    });

    if (!variables.contentRaw && !variables.blocks?.length) return;
    return _createPostOrReply({
      variables: {
        ...variables,
        isReply: !!variables.parentId,
      },
      optimisticResponse: {
        createPostOrReplyForAccount: {
          __typename: "PostMutationResponse",
          code: 201,
          success: true,
          message: "Post created",
          post,
        },
      },
      update: (
        cache,
        {
          data: {
            createPostOrReplyForAccount: createPostOrReplyForAccountData,
          },
        }
      ) => {
        if (createPostOrReplyForAccountData.success) {
          if (createPostOrReplyForAccountData.post.parent?._id) {
            /** Add post comment count @TODO figure out how is it doing this automatically */
            cache.modify({
              id: cache.identify(createPostOrReplyForAccountData.post.parent),
              fields: {
                commentCount: (count) => count + 1,
                replies: (existingReplies = []) => {
                  const newReplyRef = cache.writeFragment({
                    data: createPostOrReplyForAccountData.post,
                    fragment: CORE_COMMENT_FIELDS,
                    fragmentName: "CoreCommentFields",
                  });
                  return [newReplyRef, ...existingReplies];
                },
              },
            });
          } else {
            /** Modify Post Feed */
            cache.modify({
              fields: {
                getPostFeed(existingPostFeed = []) {
                  const newPostRef = cache.writeFragment({
                    data: createPostOrReplyForAccountData.post,
                    fragment: CORE_POST_FIELDS,
                    fragmentName: "CorePostFields",
                  });
                  return [newPostRef, ...existingPostFeed];
                },
              },
            });
          }
        }
      },
    });
  };

  /** Variables */
  const loading = createPostLoading;

  const postFailed = data?.createPostOrReplyForAccount?.success === false;

  const error =
    createPostError ||
    (postFailed && data?.createPostOrReplyForAccount?.message);

  return {
    createPostOrReply,
    loading,
    error,
  };
};
