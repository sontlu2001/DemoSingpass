import api from "./httpClient";

export const loginAPI = async (data) => {
  return await api.post("/auth/local", {
    identifier: data.email,
    password: data.password,
  });
};
