const API_BASE_URL = "http://localhost:3000";

export const api = {
  categories: {
    getAll: () =>
      fetch(`${API_BASE_URL}/api/category`).then((res) => res.json()),
    getById: (id: number) =>
      fetch(`${API_BASE_URL}/api/category/${id}`).then((res) => res.json()),
    create: (data: Category) =>
      fetch(`${API_BASE_URL}/api/category`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      }).then((res) => res.json()),
    delete: async (id: string): Promise<DeleteCategoryResponse> => {
      const res = await fetch(`${API_BASE_URL}/api/category`, {
        method: "DELETE",
        body: JSON.stringify({ id }),
        headers: { "Content-Type": "application/json" },
      });
      if (res.status === 204) {
        return {};
      }
      return res.json();
    },
  },

  posts: {
    getAll: () => fetch(`${API_BASE_URL}/api/post`).then((res) => res.json()),

    getById: (id: string) =>
      fetch(`${API_BASE_URL}/api/post/${id}`).then((res) => res.json()),

    getByTitle: (title: string) =>
      fetch(`${API_BASE_URL}/api/post/slug/${title}`).then((res) => res.json()),

    create: (data: FormData) =>
      fetch(`${API_BASE_URL}/api/post`, {
        method: "POST",
        body: data,
      }).then((res) => res.json()),

    incrementView: (id: number) =>
      fetch(`${API_BASE_URL}/api/views`, {
        method: "POST",
        body: JSON.stringify({ postId: id }),
        headers: { "Content-Type": "application/json" },
      }).then((res) => res.json()),

    delete: (id: string) =>
      fetch(`${API_BASE_URL}/api/post/${id}`, {
        method: "DELETE",
      }),
  },
};
