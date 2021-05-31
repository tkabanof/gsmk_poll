import {createSlice} from "@reduxjs/toolkit";
import {clientApi} from "../Api/Api";

type Client = {
    id: number,
    surname: string,
    name1: string,
    name2: string,
    birthday: string,
    phone: string,
    state: string,
    call_date: string,

}

const initialState = {
    id: 1

} as Client

export const clientSlice = createSlice({
    name: 'client',
    initialState,
    reducers: {
        setClient: (state, action) => {
            console.log(action.payload)
            const id = action.payload.id
            state = id
        }
    }
})
export const getNewClient = (data: any) => async (dispatch: any) => {
    let response = await clientApi.getOneClient(data);
    if (response.status === 200) {
        dispatch(setClient(response.data))
    }
};

export const {setClient} = clientSlice.actions

export default clientSlice.reducer