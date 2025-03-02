interface Category {
  title: string;
  id: number;
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
