interface Category {
  title: string;
  id: string;
  created_at: string;
  cover_image: string;
  slug: string;
}

interface Post {
  id: number;
  created_at: string;
  title: string;
  content: string;
  cover_image: string;
  category: number;
  views: number;
  categoryTitle: string;
  slug?: string;
}

interface DeleteCategoryResponse {
  error?: string;
  type?: string;
}

interface User {
  id: number;
  created_at: string;
  email: string;
  bio: string;
  username: string;
  avatar_url: string;
  first_name: string;
  last_name: string;
}

interface CommentInterface {
  id: string;
  content: string;
  user_id: string;
  created_at: string;
  user: {
    id: string;
    first_name: string;
    last_name: string;
    avatar_url?: string | null;
    username?: string;
  };
}

interface PostContextInterface {
  id: string;
  post_id: number;
  post: Post;
}
