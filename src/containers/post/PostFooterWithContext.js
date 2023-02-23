import React from "react";
import { Box } from "@chakra-ui/layout";
import { useQuery } from "@apollo/client";

import { PostFooter } from "../../components/post/PostFooter";

import { CreatePostOrReply } from "../../containers/post/CreatePostOrReply";

import { GET_POST_COMMENT_COUNT } from "../../graphql/queries/GET_POST_COMMENT_COUNT";

const withPostFooterAction = (Component) => {
  const Memo = React.memo(Component);

  // eslint-disable-next-line react/display-name
  return ({ postId, index, postLink, replyEditorStyle, ...props }) => {
    const [showReplyEditor, setShowReplyEditor] = React.useState(false);

    const { data } = useQuery(GET_POST_COMMENT_COUNT, {
      variables: {
        id: postId,
      },
      skip: !postId,
    });

    const onPostCommentClick = React.useCallback(
      (e) => {
        e.preventDefault();
        if (replyEditorStyle === "inline") {
          setShowReplyEditor((show) => !show);
        } else if (replyEditorStyle === "link") {
          window.location.href = postLink;
        }
      },
      [replyEditorStyle, postLink, setShowReplyEditor]
    );

    const commentCount = React.useMemo(() => {
      return index === 0
        ? data?.getPost?.rootCommentCount
        : data?.getPost?.commentCount;
    }, [data, index]);

    return (
      <Box display={"flex"} flexDir="column">
        <Box>
          <Memo
            commentCount={commentCount}
            size="sm"
            postLink={postLink}
            onPostCommentClick={onPostCommentClick}
            index={index}
            postId={postId}
            {...props}
          />
        </Box>
        {showReplyEditor && (
          <Box w="100%" mt={2}>
            <CreatePostOrReply
              editorProps={{
                autofocus: "end",
              }}
              size="sm"
              id={`CreatePostOrReply-${postId}`}
              // parentId={level >= 3 ? parent._id : post._id} this is in place to avoid infinite nesting. disabked for now
              parentId={postId}
              placeholder={"What do you think?"}
              colorScheme="gray"
              callback={() => setShowReplyEditor(false)}
            ></CreatePostOrReply>
          </Box>
        )}
      </Box>
    );
  };
};

export const PostFooterWithAction = withPostFooterAction(PostFooter);
