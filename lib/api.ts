const API_BASE_URL = "http://localhost:3000";

export const api = {
  categories: {
    getAll: () =>
      fetch(`${API_BASE_URL}/api/category`).then((res) => res.json()),
    create: (data: Category) =>
      fetch(`${API_BASE_URL}/api/category`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      }).then((res) => res.json()),
    delete: (id: string) =>
      fetch(`${API_BASE_URL}/api/category`, {
        method: "DELETE",
        body: JSON.stringify({ id }),
        headers: { "Content-Type": "application/json" },
      }),
  },
};
