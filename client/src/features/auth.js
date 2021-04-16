import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {authAPI} from "../components/Api/Api";

const loginAuth = createAsyncThunk(
    'auth/login',
    async ({email, password}, thunkAPI) => {
        const response = await authAPI.login(email, password)
        console.log(response)
        debugger
        return response.data
    }
)

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        userid: null,
        email: null,
        role: null,
        fio: null,
        token: null
    },
    reducers: {
        setAuthData: (state, action) => {
            state.userid = action.payload.userid
            state.email = action.payload.email
            state.isAuth = action.payload.isAuth
            state.role = action.payload.role
            state.fio = action.payload.fio
        }
    }
})

export const login = (email, password) => async dispatch => {
    let response = await authAPI.login(email, password);
    if (response.status === 200) {
        console.log(response.data)
        dispatch(setAuthData(response.data));
    }
};

export const {setAuthData} = authSlice.actions

export default authSlice.reducer