import api from "../services/api";

export const createOrder = async (orderData) => {
    const response = await api.post("/orders", orderData);
    return response.data;
}

export const getUserOrders = async () => {
    const response = await api.get("/orders");
    return response.data;
}

export const getOrderById = async (id) => {
    const response = await api.get(`/orders/${id}`);
    return response.data;
}