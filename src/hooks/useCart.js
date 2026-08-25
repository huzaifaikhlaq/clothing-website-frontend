import api from "../services/api";

export const getCart = async () => {
    const response = await api.get("/cart");
    return response.data;
};

export const addToCart = async (cartData) => {
    const response = await api.post("/cart", cartData);
    return response.data;
};

export const updateCart = async (cartData) => {
    const response = await api.patch("/cart", cartData);
    return response.data;
};

export const removeCartItem = async (productId) => {
    const response = await api.delete(`/cart/${productId}`);
    return response.data;
};

export const clearCart = async () => {
    const response = await api.delete("/cart/clear");
    return response.data;
};

// export const mergeGuestCart
