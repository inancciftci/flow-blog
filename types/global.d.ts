interface Category {
  title: string;
  id?: string;
  created_at?: string;
}

interface Post {
  id: number;
  created_at: string;
  title: string;
  content: string;
  cover_image: string;
  category: number;
  views: number;
  categoryTitle?: string;
}
