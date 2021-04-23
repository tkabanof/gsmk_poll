import { configureStore } from '@reduxjs/toolkit'
import authReducer from "../features/auth";
import pollSlice from "../features/polls";

export default configureStore({
    reducer: {
        auth: authReducer,
        poll: pollSlice
    },
})


