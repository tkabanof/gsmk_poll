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

type Answer = {
    id: number,
    text: string,
    createdAt: string,
    updatedAt: string,
    questionId: number
}
type Question = {
    id: number,
    text: string,
    createdAt: string,
    updatedAt: string,
    templateId: number,
    answers: Array<Answer>
}

interface state {
    data: {
        client: Client
        question: Question
    }
}

const initialState = {
    data: {
        client: {
            id: 1
        }
    }

} as state

export const clientSlice = createSlice({
    name: 'client',
    initialState,
    reducers: {
        setClient: (state, action) => {
            state.data.client = action.payload
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