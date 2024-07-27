import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000",
});

api.interceptors.request.use(
  (config) => {
    const authStore = JSON.parse(localStorage.getItem("auth-store"));
    const token = authStore?.state?.token;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const newHostel = async (data) =>
  await api.post("/api/hostels", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const IMAGE_URL = `http://localhost:8000/public`;
export const getHostels = async () => await api.get("/api/hostels");
export const getHostel = async (id) => await api.get(`/api/hostels/${id}`);

export const loginUser = async (data) =>
  await api.post("/api/auth/login", data);
export const registerUser = async (data) =>
  await api.post("/api/auth/register", data);

export const bookHostel = async (data) => await api.post("/api/bookings", data);
export const getUserBookings = async () => await api.get("/api/bookings/user");
export const getAllBookings = async () => await api.get("/api/bookings/user");
