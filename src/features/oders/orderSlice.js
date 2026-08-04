import { createSlice } from "@reduxjs/toolkit";
import { createOrderThunk, fetchOrderByIdThunk, fetchOrdersThunk, updateOrderThunk, fetchAllAdminOrdersThunk, deleteOrderThunk } from "./orderTrunk";

const initialState = {
    orders: [],
    adminOrders: [],
    currentOrder: null,

    loading: false,
    success: false,
    error: null,
};

const orderSlice = createSlice({
    name: "order",

    initialState,

    reducers: {
        clearCurrentOrder(state) {
            state.currentOrder = null;
        },

        clearOrderError(state) {
            state.error = null;
        },

        resetOrderSuccess(state) {
            state.success = false;
        },
    },

    extraReducers: (builder) => {
        builder

            // Create Order
            .addCase(createOrderThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })

            .addCase(createOrderThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;

                state.currentOrder = action.payload.order;

                state.orders.unshift(action.payload.order);
            })

            .addCase(createOrderThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Fetch Orders
            .addCase(fetchOrdersThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })

            .addCase(fetchOrdersThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.orders = action.payload.orders || [];
            })

            .addCase(fetchOrdersThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Fetch All Admin Orders
            .addCase(fetchAllAdminOrdersThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAllAdminOrdersThunk.fulfilled, (state, action) => {
                state.loading = false;
                // FIX: Extract 'orders' from the payload object
                state.adminOrders = action.payload.orders || action.payload.data || [];
            })
            .addCase(fetchAllAdminOrdersThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Update Order
            .addCase(updateOrderThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })

            .addCase(updateOrderThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.currentOrder = action.payload.order;
            })

            .addCase(updateOrderThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Delete Order
            .addCase(deleteOrderThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.adminOrders = state.adminOrders.filter((order) => order._id !== action.payload.order._id);
            })

            // Fetch Single Order
            .addCase(fetchOrderByIdThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })

            .addCase(fetchOrderByIdThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.currentOrder = action.payload;
            })

            .addCase(fetchOrderByIdThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { clearCurrentOrder, clearOrderError, resetOrderSuccess, } = orderSlice.actions;

export default orderSlice.reducer;