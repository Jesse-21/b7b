import React from "react";
import { useQuery } from "@apollo/client";
import { Box } from "@chakra-ui/layout";

import { usePostContext } from "../../context/PostContext";
import { GET_POST_REPLIES } from "../../graphql/queries/GET_POST_REPLIES";

import { PostWithActions } from "./PostWithContext";

export const PostReplies = ({ parent, replies }) => {
  return (
    <div>
      {replies?.map((post) => (
        <Box key={post?._id} ml={4}>
          <PostWithActions post={post} showReplies={true} />
        </Box>
      ))}
    </div>
  );
};
export const withPostReplies = (Component) => {
  const Memo = React.memo(Component);

  // eslint-disable-next-line react/display-name
  return ({ post }) => {
    const { data, loading, error } = useQuery(GET_POST_REPLIES, {
      variables: {
        id: post?._id,
      },
      skip: !post?._id,
    });
    if (loading) return <>Loading withPostReplies...</>;

    return <Memo parent={post} replies={data?.getPost?.replies} />;
  };
};

export const withPostContext = (Component) => {
  const Memo = React.memo(Component);

  // eslint-disable-next-line react/display-name
  return () => {
    const { post, loading, error } = usePostContext();
    if (loading) return <>Loading withPostContext...</>;
    if (!post?._id) return <>No post</>;
    return <Memo post={post} />;
  };
};

export const PostRepliesWithContext = withPostContext(
  withPostReplies(PostReplies)
);
