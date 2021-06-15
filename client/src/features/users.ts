import {createSlice} from "@reduxjs/toolkit";
import {userApi} from "../Api/Api";

type user = {
    id: number,
    email: string,
    fio: string,
    role: string
}

interface state {
    users: Array<user>
    count: number
}

const initialState = {
    users: [],
    count: 0

} as state

export const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        setUsers: (state, action) => {
            state.users = action.payload
        }
    }
})

export const getAllUsers = () => async (dispatch: any) => {
    const response = await userApi.getAllUsers()
    if (response.status === 200) {
        dispatch(setUsers(response.data.users))
    }
}

export const {setUsers} = userSlice.actions

export default userSlice.reducer