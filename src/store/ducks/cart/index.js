import { createSlice } from "@reduxjs/toolkit";

const initialState = []

const cardSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem: (state, action) => {
            state.push(action.payload)
        },
        removeItem: (state, action) => {
            let indexState = 0;
            state.filter((item, index) => {
                if (item.id == action.payload) {
                    indexState = index;
                }
            } )
            state.splice(indexState, 1);
        },
        cleanCart: (state, action) => {
            state.pop()
        },
    },
})

export const { addItem, removeItem, cleanCart } = cardSlice.actions
export default cardSlice.reducer