import api from "../api/api";

export const loginUser = (data) => api.post("/login", data);

export const registerUser = (data) => api.post("/register", data);

export const getProfile = () => api.get("/profile");
