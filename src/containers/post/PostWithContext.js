import React from "react";

const Post = ({ post }) => {
  return (
    <div>
      <p>{post?.richContent?.content?.raw}</p>
    </div>
  );
};
const withPostContext = (Component) => {
  const Memo = React.memo(Component);

  // eslint-disable-next-line react/display-name
  return ({ post }) => {
    return <Memo post={post} />;
  };
};
export const PostWithContext = withPostContext(Post);
