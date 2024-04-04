import request from "../utils/request";

export const createFile = async (data) => {
  const res = await request.post("file", data);
  return res.data;
};
