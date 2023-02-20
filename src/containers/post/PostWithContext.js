import React from "react";
import { usePostContext } from "../../context/PostContext";

import { PostReplies, withPostReplies } from "./PostRepliesWithContext";

const PostWithReplies = withPostReplies(PostReplies);

const Post = ({ post, showReplies = false }) => {
  return (
    <div>
      <p>{post?.richContent?.content?.raw}</p>
      {showReplies && (
        <PostWithReplies
          post={post}
          // @TODO maybe stop looping at certain index?
          showReplies={true}
        />
      )}
    </div>
  );
};
const withPostActions = (Component) => {
  const Memo = React.memo(Component);

  // eslint-disable-next-line react/display-name
  return (props) => {
    return <Memo {...props} />;
  };
};

const withPostContext = (Component) => {
  const Memo = React.memo(Component);

  // eslint-disable-next-line react/display-name
  return () => {
    const { post, loading, error } = usePostContext();
    if (loading) return <>Loading...</>;
    if (!post?._id) return <>No post</>;
    return <Memo post={post} />;
  };
};

export const PostWithContext = withPostContext(withPostActions(Post));
export const PostWithActions = withPostActions(Post);
