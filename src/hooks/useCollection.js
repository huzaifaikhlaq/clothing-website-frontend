import api from "../services/api";

export const createCollection = async (CollectionData) => {
    const response = await api.post("/collections", CollectionData);
    return response.data;
}

export const getAllCollections = async () => {
    const response = await api.get("/collections");
    return response.data;
}

export const getCollectionById = async (id) => {
    const response = await api.get(`/collections/${id}`);
    return response.data;
}

export const updateCollection = async (id, CollectionData) => {
    const response = await api.patch(`/collections/${id}`, CollectionData);
    return response.data;
}

export const deleteCollection = async (id) => {
    const response = await api.delete(`/collections/${id}`);
    return response.data;
}