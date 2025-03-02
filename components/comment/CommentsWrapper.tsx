// CommentPostFormWrapper.tsx
import Comments from "./Comments";

const CommentsWrapper = ({ postId }: { postId: number }) => {
  return <Comments postId={postId} />;
};

export default CommentsWrapper;
