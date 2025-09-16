import http from "./http";

export const getUserById = async (id) => {
  const res = await http.get(`/users/${id}`);
  return res.data;
};

export const updateUser = async (id, data) => {
  const res = await http.put(`/users/${id}`, data);
  return res.data;
};


