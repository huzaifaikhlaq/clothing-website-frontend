import { createAsyncThunk } from "@reduxjs/toolkit";
import { createOrder, getUserOrders, getOrderById } from "../../hooks/useOrder.js";

// Create Order
export const createOrderThunk = createAsyncThunk(
    "order/createOrder",
    async (orderData, { rejectWithValue }) => {
        try {
            const response = await createOrder(orderData);
            return response;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Failed to create order"
            );
        }
    }
);

// Get Logged In User Orders
export const fetchOrdersThunk = createAsyncThunk(
    "order/fetchOrders",
    async (_, { rejectWithValue }) => {
        try {
            const response = await getUserOrders();
            return response;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Failed to fetch orders"
            );
        }
    }
);

// Get Single Order
export const fetchOrderByIdThunk = createAsyncThunk(
    "order/fetchOrderById",
    async (id, { rejectWithValue }) => {
        try {
            const response = await getOrderById(id);
            return response;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Failed to fetch order"
            );
        }
    }
);