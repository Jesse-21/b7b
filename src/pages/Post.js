import React from "react";
import { useParams } from "react-router-dom";

import { PostWithContext } from "../containers/post/PostWithContext";
import { PostRepliesWithContext } from "../containers/post/PostRepliesWithContext";

import { PostContextProvider } from "../context/PostContext";

const withPostParams = (Component) => {
  const Memo = React.memo(Component);

  // eslint-disable-next-line react/display-name
  return () => {
    const { postId } = useParams();
    return (
      <PostContextProvider postId={postId}>
        <Memo />
      </PostContextProvider>
    );
  };
};

const PostPageContent = () => {
  return (
    <>
      <PostWithContext></PostWithContext>
      <PostRepliesWithContext></PostRepliesWithContext>
    </>
  );
};

export const Post = withPostParams(PostPageContent);
