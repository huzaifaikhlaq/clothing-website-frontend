import api from "../services/api";

export const createProduct = async (ProductData) => {
    const response = await api.post("/products", ProductData);
    return response.data;
}

export const getAllProducts = async (params = {}) => {
    const response = await api.get("/products", { params });
    return response.data;
}

export const updateProduct = async (id, ProductData) => {
    const response = await api.patch(`/products/${id}`, ProductData);
    return response.data;
}

export const getProductById = async (id) => {
    const response = await api.get(`/products/${id}`);
    return response.data;
}

export const deleteProduct = async (id) => {
    const response = await api.delete(`/products/${id}`);
    return response.data;
}