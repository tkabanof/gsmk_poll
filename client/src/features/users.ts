import {createSlice} from "@reduxjs/toolkit";
import {userApi} from "../Api/Api";

type user = {
    id: number,
    email: string,
    fio: string,
    role: string
}
type paginator = {
    current: number,
    pageSize: number,
    total: number
}

interface state {
    users: Array<user>,
    paginator: paginator
}

const initialState = {
    users: [],
    paginator: {
        current: 0,
        pageSize: 0,
        total: 0
    }

} as state

export const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        setUsers: (state, action) => {
            state.users = action.payload.users
            state.paginator.current = Number.parseInt(action.payload.paginator.current)
            state.paginator.pageSize = Number.parseInt(action.payload.paginator.pageSize)
            state.paginator.total = Number.parseInt(action.payload.paginator.total)
        }
    }
})

export const getAllUsers = (paginator: paginator) => async (dispatch: any) => {
    const response = await userApi.getAllUsers(paginator)
    if (response.status === 200) {
        dispatch(setUsers(response.data))

    }
}

export const {setUsers} = userSlice.actions

export default userSlice.reducer