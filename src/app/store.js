import { configureStore } from '@reduxjs/toolkit';

import cartReducer from '../features/cart/cartSlice.js';
import orderReducer from '../features/oders/orderSlice.js';

export const store = configureStore({
    reducer: {
        cart: cartReducer,
        order: orderReducer
    },
});             