import {createSlice} from "@reduxjs/toolkit";
import {clientApi} from "../Api/Api";
import {setAuthData} from "./auth";

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
        count: number
        client: Client
        questions: Array<Question>
    },
    stat: any
}

const initialState = {
    data: {
        count: 0,
        client: {
            id: 1
        },
        questions: [
            {
                id: 1,
                text: 'Вопрос 1',
                answers: [{
                    id: 1,
                    text: 'Ответ1'
                }]
            }
        ]
    },
    stat: {
        callByOper: [
            {

            }
        ],
        total: [
            {
                CLOSED: 0,
                DONE: 0,
                REFUSED: 0,
                TOTAL: 1727
            }
        ]

    }

} as state

export const clientSlice = createSlice({
    name: 'client',
    initialState,
    reducers: {
        setClient: (state, action) => {
            state.data.client = action.payload
        },
        setQuestionAnswer: (state, action) => {
            state.data.questions = action.payload
        },
        setStat: (state, action) => {
            console.log(action.payload)
            state.stat = action.payload
        },
        addCount: (state) => {
            state.data.count = state.data.count + 1
        }
    }
})
export const getNewClient = (data: any, callback: any) => async (dispatch: any) => {
    await clientApi.getOneClient(data).then((r) => {
        if (r.status === 200) {
            if (r.data) {
                dispatch(setClient(r.data))
            }else {
                callback() //Если по запросу больше некого обзванинвать то вызываем колюбек (редирект)
            }
        }
    }).catch((e) => {
        console.log(e)
    })

};
export const getQuestionAnswer = (id: number) => async (dispatch: any) => {
    let response = await clientApi.getQuestionAnswer(id);
    if (response.status === 200) {
        dispatch(setQuestionAnswer(response.data))
    }
};
export const getStat = (id: number) => async (dispatch: any) => {
    let response = await clientApi.getStat(id);
    if (response.status === 200) {
        dispatch(setStat(response.data))
    }
};
export const setAnswers = (data: any) => async (dispatch: any) => {
    let response = await clientApi.setAnswers(data);
    if (response.status === 200) {
        //dispatch(setClient({id: 1}))
        dispatch(addCount())
    }
};
export const refuseClient = (data: any) => async (dispatch: any) => {
    let response = await clientApi.refuseClient(data);
    if (response.status === 200) {
        //dispatch(setClient({id: 1}))
        dispatch(addCount())
    }
};
export const delayClient = (data: any) => async (dispatch: any) => {
    let response = await clientApi.delayClient(data);
    if (response.status === 200) {
        //dispatch(setClient({id: 1}))
        dispatch(addCount())
    }
};
export const {setClient, setQuestionAnswer, addCount, setStat} = clientSlice.actions

export default clientSlice.reducer