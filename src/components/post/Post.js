import {
  PostReplies,
  withPostReplies,
} from "../../containers/post/PostRepliesWithContext";
import { PostContent } from "./PostContent";

const PostWithReplies = withPostReplies(PostReplies);

export const Post = ({ post, showReplies = false, index = 0 }) => {
  console.log("Post", post?._id, showReplies, index);
  return (
    <div>
      <PostContent content={post?.richContent?.content} />
      {showReplies && (
        <PostWithReplies
          post={post}
          // @TODO maybe stop looping at certain index?
          showReplies={true}
          index={index + 1}
        />
      )}
    </div>
  );
};
