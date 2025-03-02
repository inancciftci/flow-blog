// CommentPostFormWrapper.tsx
import CommentPostForm from "@/components/comment/CommentPostForm";

const CommentPostFormWrapper = ({ postId }: { postId: number }) => {
  return <CommentPostForm postId={postId} />;
};

export default CommentPostFormWrapper;
