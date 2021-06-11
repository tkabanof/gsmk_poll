import {createSlice} from "@reduxjs/toolkit";
import {pollApi} from "../Api/Api";

type poll = {
    key: number,
    id: number,
    name: string,
    state: string,
    dateCreate: string,
    userCreate: string,
    template: {
        id: number,
        description: string,
        createdAt: string,
        updatedAt: string
    }
}

interface state {
    data: Array<poll>
}
const initialState = {
    data : [
        {
            key: 1,
            id: 1,
            name: 'Опрос о прохождении диспансеризации 1',
            state: 'close',
            dateCreate: '2021-01-01',
            userCreate: 'Иванов И. И.',
            template: {
                id: 1,
                description: "sfasfgag",
                createdAt: "2021-04-26T18:32:37.345Z",
                updatedAt: "2021-04-26T18:32:37.345Z"
            }
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
            if (state.data !== polls) {
                state.data = polls
            }

        }
    }
})

export const createNewPoll = (description: string, templateId: number, state: string, dataSet?: any) => async (dispatch: any) => {
    let response = await pollApi.createNewPoll(description, templateId, state, dataSet);
    if (response.status === 200) {
        dispatch(getAllPoll())
    }
};
export const changeStatusPoll = (id: number, state: string) => async (dispatch: any) => {
    let response = await pollApi.changeStatusPoll(id, state);
    console.log(response)
    if (response.status === 200) {
        dispatch(getAllPoll())
    }
};
export const deleteOnePoll = (id: number) => async (dispatch: any) => {
    let response = await pollApi.deleteOnePoll(id);
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
export const getAllPollOpen = () => async (dispatch: any) => {
    let response = await pollApi.getAllPollOpen();
    if (response.status === 200) {
        dispatch(setPoll(response.data))
    }
};

export const {setPoll} = pollSlice.actions

export default pollSlice.reducer