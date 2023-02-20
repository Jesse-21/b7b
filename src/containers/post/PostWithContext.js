import React from "react";
import { usePostContext } from "../../context/PostContext";

const Post = ({ post }) => {
  return (
    <div>
      <p>{post?.richContent?.content?.raw}</p>
    </div>
  );
};
const withPostActions = (Component) => {
  const Memo = React.memo(Component);

  // eslint-disable-next-line react/display-name
  return ({ post }) => {
    return <Memo post={post} />;
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

export const PostWithContext = withPostContext(Post);
export const PostWithActions = withPostActions(Post);
