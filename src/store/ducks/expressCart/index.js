import { createSlice } from "@reduxjs/toolkit";

const initialState = []

const counterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        addExpress(state, action) {
            state.push(action.payload)
        },
        cleanExpress(state, action) {
            state.pop()
        },
        removeExpress(state, action) {
            let indexState = 0;
            state.filter((item, index) => {
                if (item.id == action.payload) {
                    indexState = index;
                }
            })
            state.splice(indexState, 1);
        }
    },
})

export const { addExpress, removeExpress, cleanExpress } = counterSlice.actions
export default counterSlice.reducer