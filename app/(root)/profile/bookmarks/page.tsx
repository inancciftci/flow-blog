"use client";

import CategoryPost from "@/components/post/CategoryPost";
import { useComments } from "@/context/CommentsContext";

const BookmarksPage = () => {
  const context = useComments();
  const posts = context?.posts || [];
  console.log(`Posts: ${posts}`);
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Bookmarked Posts</h2>
      <div className="flex flex-col gap-4">
        {posts?.length ? (
          posts.map((post) => (
            <CategoryPost post={post.post} key={post.post.id} />
          ))
        ) : (
          <p>No posts available.</p>
        )}
      </div>
    </div>
  );
};

export default BookmarksPage;
