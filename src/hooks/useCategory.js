import api from "../services/api";

export const createCategory = async (CategoryData) => {
    const response = await api.post("/categories", CategoryData);
    return response.data;
}

export const getAllCategories = async () => {
    const response = await api.get("/categories");
    return response.data;
}

export const getCategoryById = async (id) => {
    const response = await api.get(`/categories/${id}`);
    return response.data;
}

export const updateCategory = async (id, CategoryData) => {
    const response = await api.patch(`/categories/${id}`, CategoryData);
    return response.data;
}

export const deleteCategory = async (id) => {
    const response = await api.delete(`/categories/${id}`);
    return response.data;
}   