import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { PostType } from "../../interfaces";

interface BaseState<T> {
    value: T[];
    isLoading: boolean;
}

const initialState: BaseState<PostType> = {
    value: [],
    isLoading: false,
};

export const postSlice = createSlice({
    name: "post",
    initialState,
    reducers: {
        updatePostState: (state, action) => {
            const post = {
                ...state.value[0],
                ...action.payload
            }
            
            state.value = [post]
            state.isLoading = false;
        },
        clearPostState: (state) => {
            Object.assign(state, initialState);
        },

        getPostFetch: (state, action) => {
            state.isLoading = true;
        },
        
        postPostFetch: (state, action) => {
            state.isLoading = true;
        },
        putPostFetch: (state, action) => {
            state.isLoading = true;
        },
        failurePostFetch: (state) => {
            state.isLoading = false;
        },
    },
});

export const {
    updatePostState,
    clearPostState,
    getPostFetch,
    postPostFetch,
    putPostFetch,
    failurePostFetch,
} = postSlice.actions;
export const postSelect = (state: RootState) => state.post;
export default postSlice.reducer;
