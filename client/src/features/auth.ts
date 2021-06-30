import {createSlice} from "@reduxjs/toolkit";
import {authAPI} from "../Api/Api";
import jwt_decode from 'jwt-decode';

interface state {
    userid: null | number
    email: null | string
    role: null | string
    fio: null | string
    token: null | string
}
type dataInit = {
    email: string
    exp: number
    fio: string
    iat: number
    role: string
    userid: number
}

const tokenData = ()=>{
    const token = localStorage.getItem('token')
    const decoded = jwt_decode(token as string)
    return decoded
}
const dataInit = tokenData() as dataInit

const initialState = {
    userid: dataInit.userid,
    email: dataInit.email,
    role: dataInit.role,
    fio: dataInit.fio,
    token: localStorage.getItem('token')

} as state

//const initialState = tokenData() as state

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setToken: (state, action) => {
            state.token = action.payload
            localStorage.setItem('token', action.payload)
            console.log(tokenData())
        },
        setAuthData: (state, action) => {
            state.userid = action.payload.userid
            state.email = action.payload.email
            state.role = action.payload.role
            state.fio = action.payload.fio
        },
        wipeAuthData: (state) => {
            state.userid = null
            state.email = null
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

    let response = await authAPI.authMe();
    if (response.status === 200) {
        dispatch(setAuthData(response.data.user))
        dispatch(setToken(response.data.token))
    } else {
        dispatch(wipeAuthData())
    }
}

export const {setAuthData, wipeAuthData, setToken} = authSlice.actions

export default authSlice.reducer