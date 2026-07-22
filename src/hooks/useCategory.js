import api from "../services/api";

export const createCategory = async (CategoryData) => {
    const response = await api.post("/categories", CategoryData);
    return response.data;
}

export const getAllCategories = async () => {
    const response = await api.get("/categories");
    return response.data;
}