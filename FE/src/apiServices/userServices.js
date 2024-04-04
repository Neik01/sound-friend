import request from "../utils/request";

export const login = async (data) => {
  const res = await request.post("login", data);
  return res.data;
};

export const register = async (data) => {
  const res = await request.post("register", data);

  return res.data;
};

export const me = async () => {
  const res = await request.get("me");

  return res.data;
};
