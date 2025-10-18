import api from "./axios";

export const authApi = {
  login: (email, password) =>
    api.post("/api/auth/login", { email, password }).then((r) => r.data),
  signup: (email, password) =>
    api.post("/api/auth/signup", { email, password }).then((r) => r.data),
  test: () => api.get("/api/auth/test-jwt").then((r) => r.data),
};
