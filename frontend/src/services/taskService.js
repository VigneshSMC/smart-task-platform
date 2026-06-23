import api from "../api/api";

export const getTasks = () =>
 api.get("/");

export const getTask = (id) =>
 api.get(`/${id}`);

export const createTask = (data) =>
 api.post("/", data);

export const updateTask = (
 id,
 data
) =>
 api.put(`/${id}`, data);

export const deleteTask = (id) =>
 api.delete(`/${id}`);
