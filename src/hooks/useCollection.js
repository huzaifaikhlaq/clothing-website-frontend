import api from "../services/api";

export const createCollection = async (CollectionData) => {
    const response = await api.post("/collections", CollectionData);
    return response.data;
}

export const getAllCollections = async () => {
    const response = await api.get("/collections");
    return response.data;
}