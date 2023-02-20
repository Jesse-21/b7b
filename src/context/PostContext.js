import React from "react";
import { useQuery } from "@apollo/client";

// import { GET_POST_REPLIES } from "../graphql/queries/GET_POST_REPLIES";
import { GET_POST } from "../graphql/queries/GET_POST";

export const PostContext = React.createContext({
  post: null,
  loading: false,
  error: null,
});
PostContext.displayName = "PostContext";

export const usePostContext = () => React.useContext(PostContext);

export const PostContextProvider = ({ children, postId }) => {
  const { data, loading, error } = useQuery(GET_POST, {
    variables: {
      id: postId,
    },
    skip: !postId,
  });

  const post = React.useMemo(() => {
    return data?.getPost;
  }, [data]);

  return (
    <PostContext.Provider
      value={{
        post,
        loading,
        error,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};
