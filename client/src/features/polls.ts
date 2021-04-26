import {createSlice} from "@reduxjs/toolkit";
import {pollApi} from "../Api/Api";

type poll = {
    key: string,
    name: string,
    state: string,
    dateCreate: string,
    userCreate: string,
}

interface state {
    data: Array<poll>
}
const initialState = {
    data : [
        {
            key: '1',
            name: 'Опрос о прохождении диспансеризации 1',
            state: 'close',
            dateCreate: '2021-01-01',
            userCreate: 'Иванов И. И.',
        },
    ]

} as state

export const pollSlice = createSlice({
    name: 'poll',
    initialState,
    reducers: {
        setPoll: (state, action) => {
            const polls = action.payload.map((p: { id: any; key: any; name: any; description: any}) => {
                p.key = p.id
                p.name = p.description
                return p
            })
            state.data = polls
        }
    }
})

export const createNewPoll = (description: string, template_id: string, state: string) => async (dispatch: any) => {
    let response = await pollApi.createNewPoll(description, template_id, state);
    if (response.status === 200) {
        dispatch(getAllPoll())
    }
};
export const getAllPoll = () => async (dispatch: any) => {
    let response = await pollApi.getAllPoll();

    if (response.status === 200) {
        dispatch(setPoll(response.data))
    }
};

export const {setPoll} = pollSlice.actions

export default pollSlice.reducer