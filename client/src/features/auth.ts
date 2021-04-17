import {createSlice} from "@reduxjs/toolkit";
import {authAPI} from "../components/Api/Api";

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
    token: null,
    isAuth: false

} as state

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuthData: (state, action) => {
            state.userid = action.payload.userid
            state.email = action.payload.email
            state.isAuth = action.payload.isAuth
            state.role = action.payload.role
            state.fio = action.payload.fio
            state.token = action.payload.token

            localStorage.setItem('token', action.payload.token);
        },
        wipeAuthData: (state, action) => {
            state.userid = null
            state.email = null
            state.isAuth = false
            state.role = null
            state.fio = null
            state.token = null

            localStorage.removeItem('token')
        }
    }
})

/*export const login = (email, password) => async dispatch => { //unused
    let response = await authAPI.login(email, password);
    if (response.status === 200) {
        dispatch(setAuthData(response.data))
        return response
    }
    if (response.status === 200) {
        return response

    }
};*/

export const {setAuthData, wipeAuthData} = authSlice.actions

export default authSlice.reducer