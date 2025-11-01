import http from "./http";

const BASE_URL = "/todos";

export const getTodos = async (token, search) => {
  const res = await http.get(BASE_URL, {
    params: search ? { search } : undefined,
  });
  return res.data;
};

export const createTodo = async (data, token) => {
  console.log("[createTodo] Sending request with data:", data);
  const res = await http.post(BASE_URL, data);
  console.log("[createTodo] Response received:", res);
  console.log("[createTodo] Response data:", res.data);
  return res.data;
};

export const updateTodo = async (id, data, token) => {
  const res = await http.put(`${BASE_URL}/${id}`, data);
  return res.data;
};

export const deleteTodo = async (id, token) => {
  const res = await http.delete(`${BASE_URL}/${id}`);
  return res.data;
};


