import { React } from "react";
import { HStack } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/button";
import { EditIcon, LinkIcon } from "@chakra-ui/icons";

import { PostUpvoteWithActions } from "../../containers/post/PostUpvoteWithContext";

import { CopyButton } from "../buttons/CopyButton";

export const PostFooter = ({
  onPostCommentClick,
  index,
  commentCount,
  postLink,
  postId,
  size,
  showUpvote,
}) => {
  return (
    <HStack>
      {showUpvote && (
        <PostUpvoteWithActions postId={postId} size="xs" flexDir="row" />
      )}
      <Button
        variant={"ghost"}
        leftIcon={<EditIcon />}
        onClick={onPostCommentClick}
        zIndex={2}
        size={size}
      >
        {commentCount >= 1 ? commentCount + " " : ""}
        {commentCount > 1 ? "Comments" : "Comment"}
      </Button>
      {index < 1 && (
        <CopyButton
          variant={"ghost"}
          value={postLink}
          icon={<LinkIcon />}
          zIndex={2}
          size={size}
        >
          Share
        </CopyButton>
      )}
    </HStack>
  );
};
