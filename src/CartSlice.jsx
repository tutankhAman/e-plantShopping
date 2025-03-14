import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [],
        totalQuantity: 0
    },
    reducers: {
        addItem: (state, action) => {
            const { name, image, cost } = action.payload;
            const existingItem = state.items.find(item => item.name === name);
            if (existingItem) {
                existingItem.quantity++;
            } else {
                state.items.push({ name, image, cost, quantity: 1 });
            }
            state.totalQuantity = state.items.reduce((total, item) => total + item.quantity, 0);
        },
        removeItem: (state, action) => {
            const removedItem = state.items.find(item => item.name === action.payload);
            state.totalQuantity -= removedItem ? removedItem.quantity : 0;
            state.items = state.items.filter(item => item.name !== action.payload);
        },
        updateQuantity: (state, action) => {
            const { name, quantity } = action.payload;
            const itemToUpdate = state.items.find(item => item.name === name);
            if (itemToUpdate) {
                state.totalQuantity += quantity - itemToUpdate.quantity;
                itemToUpdate.quantity = quantity;
            }
        }
    }
});

export const { addItem, removeItem, updateQuantity } = CartSlice.actions;

export default CartSlice.reducer;
