import { createSlice } from "@reduxjs/toolkit";
import { fetchCart, addCartItem, clearCartItems, removeItem, updateCartItem } from "./cartTrunks";

const initialState = {
    items: [],
    loading: false,
    mutationLoading: false,
    error: null,
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // --- Fetch Cart ---
            .addCase(fetchCart.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCart.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload?.cart?.items || [];
            })
            .addCase(fetchCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            // --- Add to Cart ---
            .addCase(addCartItem.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addCartItem.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload?.cart?.items || [];
            })
            .addCase(addCartItem.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || action.error.message;
            })

            // --- Update Cart Item ---
            .addCase(updateCartItem.pending, (state) => {
                state.mutationLoading = true;
                state.error = null;
            })
            .addCase(updateCartItem.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload?.cart?.items || [];
            })
            .addCase(updateCartItem.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            // --- Remove Cart Item ---
            .addCase(removeItem.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(removeItem.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload?.cart?.items || [];
            })
            .addCase(removeItem.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            // --- Clear Cart ---
            .addCase(clearCartItems.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(clearCartItems.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload?.cart?.items || [];
            })
            .addCase(clearCartItems.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export default cartSlice.reducer;