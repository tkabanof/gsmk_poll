import { configureStore } from '@reduxjs/toolkit'
import authReducer from "../features/auth";
import pollSlice from "../features/polls";
import templateSlice from "../features/templates";

export default configureStore({
    reducer: {
        auth: authReducer,
        poll: pollSlice,
        template: templateSlice
    },
})


