import api from "./axios";

export const todosApi = {
  list: async (page = 1, limit = 10) => {
    const r = await api.get(`/api/todos?page=${page}&limit=${limit}`);
    const data = r?.data;
    return {
      items: Array.isArray(data?.items)
        ? data.items
        : Array.isArray(data)
        ? data
        : [],
      page: data?.page ?? page,
      pages: data?.pages ?? 1,
    };
  },
  create: (data) => api.post("/api/todos", data).then((r) => r.data),
  update: async (id, data) => {
    try {
      const response = await api.patch(`/api/todos/${id}`, data);
      return response.data;
    } catch (error) {
      console.error("Todo update error:", error);
      throw error;
    }
  },
  remove: (id) => api.delete(`/api/todos/${id}`).then((r) => r.data),
};
