    import api from "../services/api";

    export const createProduct = async (ProductData) => {
        const response = await api.post("/products", ProductData);
        return response.data;
    }