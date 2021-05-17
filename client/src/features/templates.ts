import {createSlice} from "@reduxjs/toolkit";
import {templateApi} from "../Api/Api";

type template = {
    key: string,
    description: string,
    createdAt: string,
}

type templateData = {
    template_name: string,
    questions: Array<question>

}

type question = {
    question_text: string,
    answer: Array<answer>

}
type answer = {
    answer: string
}

interface state {
    data: Array<template>
}
const initialState = {
    data : [
        {
            key: '1',
            description: 'Шаблон диспансеризации store1',
            createdAt: '2021-01-01',
        },
    ]

} as state

export const templateSlice = createSlice({
    name: 'template',
    initialState,
    reducers: {
        setTemplate: (state, action) => {
            state.data = action.payload.map((p: { id: any; key: any; }) => {
                p.key = p.id
                return p
            })
        }
    }
})
export const createBrandNewTemplate = (data: templateData) => async (dispatch: any) => {
    let response = await templateApi.createBrandNewTemplate(data);
    if (response.status === 200) {
        dispatch(getAllTemplate())
    }
};
// export const createNewTemplate = (description: string) => async (dispatch: any) => {
//     let response = await templateApi.createNewTemplate(description);
//     if (response.status === 200) {
//         dispatch(getAllTemplate())
//     }
// };
// export const updateTemplate = (data: templateData) => async (dispatch: any) => {
//     let response = await templateApi.updateTemplateDetails(data);
//
// };
export const getAllTemplate = () => async (dispatch: any) => {
    let response = await templateApi.getAllTemplate();

    if (response.status === 200) {
        dispatch(setTemplate(response.data))
    }
};

export const deleteTemplate = (id: number) => async (dispatch: any) => {
    const response = await templateApi.deleteOne(id)

    if (response.status === 200) {
        dispatch(getAllTemplate())
    }
}

export const {setTemplate} = templateSlice.actions

export default templateSlice.reducer