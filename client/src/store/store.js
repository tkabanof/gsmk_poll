import { configureStore } from '@reduxjs/toolkit'
import authReducer from "../features/auth";
import pollSlice from "../features/polls";
import templateSlice from "../features/templates";
import clientSlice from "../features/client";

export default configureStore({
    reducer: {
        auth: authReducer,
        poll: pollSlice,
        template: templateSlice,
        client: clientSlice
    },
})


