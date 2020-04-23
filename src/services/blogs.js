import axios from 'axios';
const baseUrl = '/api/blogs';

let token = null;

export const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

export const getAll = async () => {
  const res = await axios.get(baseUrl);
  return res.data;
};

export const create = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.post(baseUrl, newObject, config);
  return response.data;
};

export const update = async (id, newObject) => {
  const request = await axios.put(`${baseUrl}/${id}`, newObject);
  return request.data;
};

export const remove = async (id) => {
  const config = {
    headers: { Authorization: token },
  };

  const request = await axios.delete(`${baseUrl}/${id}`, config);
  return request.data;
};
