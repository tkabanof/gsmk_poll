import {createSlice} from "@reduxjs/toolkit";
import {authAPI} from "../components/Api/Api";

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        userid: null,
        email: null,
        role: null,
        fio: null,
        token: null,
        errorMessage: null
    },
    reducers: {
        setAuthData: (state, action) => {
            state.userid = action.payload.userid
            state.email = action.payload.email
            state.isAuth = action.payload.isAuth
            state.role = action.payload.role
            state.fio = action.payload.fio
            state.token = action.payload.token
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

export const {setAuthData} = authSlice.actions

export default authSlice.reducer