import { API_URL } from "../const/api-url.const";

const postRequest = async (url, body, token = null) => {
  const config = {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
    },
    body: JSON.stringify(body),
  };

  if (token) config.headers.Authorization = token;

  return await request(url, config);
};

const deleteRequest = async (url, token = null) => {
  const config = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
    },
  };
  if (token) config.headers.Authorization = token;
  return await request(url, config);
};

const updateRequest = async (url, body, token = null) => {
  const config = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
    },
    body: JSON.stringify(body),
  };
  if (token) config.headers.Authorization = token;
  return await request(url, config);
};

const getRequest = async (url, token = null) => {
  const config = {
    method: "GET",
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
    },
  };
  if (token) config.headers.Authorization = token;
  return await request(url, config);
};

const request = async (url, config) => {
  let status = -1;
  let error = null;
  let data = null;
  try {
    const response = await fetch(`${API_URL}${url}`, config);
    status = response.status;
    data = await response.json();
  } catch (e) {
    error = e.message;
  } finally {
    return handleResponse(status, data, error);
  }
};

const handleResponse = (status, data, error) => {
  const hasError = !data || status >= 400;
  return {
    status,
    data: hasError ? null : data,
    error: hasError ? `Result is null ${error || ""}` : null,
  };
};

export { postRequest, getRequest, deleteRequest, updateRequest };
