import {createSlice} from "@reduxjs/toolkit";
import {authAPI, pollApi} from "../Api/Api";

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
        {
            key: '2',
            name: 'Опрос о прохождении диспансеризации 2',
            state: 'open',
            dateCreate: '2021-01-01',
            userCreate: 'Иванов И. И.',
        },
        {
            key: '3',
            name: 'Опрос о прохождении диспансеризации 3',
            state: 'open',
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
            console.log(action.payload)
            const polls = action.payload.map((p: { id: any; key: any; name: any; description: any}) => {
                p.key = p.id
                p.name = p.description
                console.log(p)
                return p
            })
            console.log(polls)
            //polls = polls.map(p.id = p.key)
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