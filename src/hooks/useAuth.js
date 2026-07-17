import api from "../services/api";

export const signup = async (userData) => {
    const response = await api.post("/auth/signup", userData);
    return response.data;
}

export const signin = async (userData) => {
    const response = await api.post("/auth/signin", userData);
    return response.data;
}