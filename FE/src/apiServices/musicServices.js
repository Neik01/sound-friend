import request from "../utils/request";

export const createMusic = async (data) => {
  const res = await request.post("audio", data);
  return res.data;
};

export const removeMusic = async (param) => {
  const res = await request.delete("audio/" + param);
  return res.data;
};

export const getListMusic = async (data) => {
  const res = await request.post("audio/find-all", data);
  return res.data;
};

export const getMyMusic = async (data) => {
  const res = await request.post("audio/find-all", data);
  return res.data;
};

export const getMusic = async (param) => {
  const res = await request.get("audio/" + param);
  return res.data;
};

export const updateMusic = async (data) => {
  const res = await request.put("audio", data);
  return res.data;
};
