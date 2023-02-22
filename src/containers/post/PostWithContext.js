import React from "react";
import { usePostContext } from "../../context/PostContext";

import { Post } from "../../components/post/Post";

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
  return ({ showReplies, isStandalone }) => {
    const { post, loading, error } = usePostContext();
    if (loading) return <>Loading...</>;
    if (!post?._id) return <>No post</>;
    return (
      <Memo post={post} showReplies={showReplies} isStandalone={isStandalone} />
    );
  };
};

export const PostWithContext = withPostContext(withPostActions(Post));
export const PostWithActions = withPostActions(Post);
