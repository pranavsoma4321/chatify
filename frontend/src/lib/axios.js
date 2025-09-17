import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: "http://localhost:5000/api", // full backend URL
    withCredentials: true,
});


