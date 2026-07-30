import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";

export const fetchCart = createAsyncThunk(
    "cart/fetchCart",
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get("/cart");
            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Failed to fetch cart"
            );
        }
    }
);

export const addCartItem = createAsyncThunk(
    "cart/addCartItem",
    async (cartData, { rejectWithValue }) => {
        try {
            const response = await api.post("/cart", cartData);
            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Failed to add to cart"
            );
        }
    }
);

export const updateCartItem = createAsyncThunk(
    "cart/updateCartItem",
    async (cartData, { rejectWithValue }) => {
        try {
            const response = await api.patch("/cart", cartData);
            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Failed to update cart item"
            );
        }
    }
);

export const removeItem = createAsyncThunk(
    "cart/removeItem",
    async ({ productId, size, color }, { rejectWithValue }) => {
        try {
            const response = await api.delete(`/cart/${productId}`, {
                data: { size, color },
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Failed to remove item from cart"
            );
        }
    }
);

export const clearCartItems = createAsyncThunk(
    "cart/clearCartItems",
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.delete("/cart/clear");
            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Failed to clear cart"
            );
        }
    }
);