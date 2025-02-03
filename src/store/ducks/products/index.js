import { createSlice } from "@reduxjs/toolkit";

const initialState = []

const counterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        addProducts(state, action) {
            state.push(action.payload)
        },
        cleanProducts(state, action) {
            let indexState = 0;
            state.filter((item, index) => {
                if (item.id == action.payload) {
                    indexState = index;
                }
            } )
            state.splice(indexState, 1);
        },
        removeProduct(state, action) {
            state.pop()
        },
    },
})

export const { addProducts, cleanProducts, removeProduct } = counterSlice.actions
export default counterSlice.reducer;