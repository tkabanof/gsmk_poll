import {createSlice} from "@reduxjs/toolkit";

interface state {
    userid: null | number
    email: null | string
    role: null | string
    fio: null | string
    token: null | string
    isAuth: boolean
}

const initialState = {
    userid: null,
    email: null,
    role: null,
    fio: null,
    token: null

} as state

export const authSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {}
})

export const {} = authSlice.actions

export default authSlice.reducer