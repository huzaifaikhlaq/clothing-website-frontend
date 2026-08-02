import { createSlice } from "@reduxjs/toolkit";
import { fetchCart, addCartItem, clearCartItems, removeItem, updateCartItem } from "./cartTrunks";

const initialState = {
    items: [],
    totalAmount: 0,
    loading: false,
    mutationLoading: false,
    error: null,
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        clearCartLocally: (state) => {
            state.items = [];
        }
    },
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
                state.totalAmount = action.payload?.cart?.totalAmount || 0;
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
                state.totalAmount = action.payload?.cart?.totalAmount || 0;

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
                state.mutationLoading = false;
                state.items = action.payload?.cart?.items || [];
                state.totalAmount = action.payload?.cart?.totalAmount || 0;

            })
            .addCase(updateCartItem.rejected, (state, action) => {
                state.mutationLoading = false;
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
                state.totalAmount = action.payload?.cart?.totalAmount || 0;

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
            .addCase(clearCartItems.fulfilled, (state) => {
                state.loading = false;
                state.items = [];
                state.totalAmount = 0;

            })
            .addCase(clearCartItems.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export const { clearCartLocally } = cartSlice.actions;
export default cartSlice.reducer;