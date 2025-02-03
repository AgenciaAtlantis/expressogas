import { createSlice } from "@reduxjs/toolkit";

const initialState = []

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login: (state, action) => {
            state.push(action.payload)
        },
        logout: (state, action) => {
            state.pop()
        },
        alterPhoto: (state, action) => {
            state.photoUser = action.payload
        }
    },
})

export const { login, logout, alterPhoto } = userSlice.actions
export default userSlice.reducer