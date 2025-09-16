import http from "./http";
import { jwtDecode } from "jwt-decode";
const API = "/auth";

export const loginUser = async (data) => {
  const res = await http.post(`${API}/login`, data);
  const { token } = res.data;
  // Derive user info from JWT payload: { userId, email }
  let user = null;
  try {
    const payload = jwtDecode(token);
    user = { id: payload.userId, email: payload.email };
  } catch (_) {
    user = null;
  }
  return { token, user };
};

export const signupUser = async (data) => {
  const res = await http.post(`${API}/signup`, data);
  // Backend returns: { message, userId }
  return res.data;
};
