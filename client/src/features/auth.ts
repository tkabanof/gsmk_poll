import {createSlice} from "@reduxjs/toolkit";
import {authAPI} from "../Api/Api";

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
        setToken: (state, action) => {
            console.log('settoken')
            console.log(action.payload)
            state.token = action.payload
            //localStorage.removeItem('token')
            localStorage.setItem('token', action.payload)
        },
        setAuthData: (state, action) => {
            //console.log(action.payload)
            state.userid = action.payload.userid
            state.email = action.payload.email
            state.role = action.payload.role
            state.fio = action.payload.fio
            //state.token = action.payload.token
            //localStorage.setItem('token', action.payload.token);
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

// export const login = (email: string, password: string) => async (dispatch: any) => {
//     let response = await authAPI.login(email, password);
//     if (response.status === 200) {
//         dispatch(setAuthData(response.data))
//     }
//
// };
export const auth = () => async (dispatch: any) => {
    const token = localStorage.getItem('token')
    console.log(token)

    let response = await authAPI.authMe();
    if (response.status === 200) {
        //dispatch(setToken(response.data.token)
        console.log('auth')
        console.log(response.data.user)
        dispatch(setAuthData(response.data.user))
        dispatch(setToken(response.data.token))
    }
}

export const {setAuthData, wipeAuthData, setToken} = authSlice.actions

export default authSlice.reducer