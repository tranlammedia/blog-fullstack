import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { TagType } from "../../interfaces";

interface BaseState<T> {
    value: T[];
    isLoading: boolean;
}

const initialState: BaseState<TagType> = {
    value: [],
    isLoading: false,
};

export const tagSlice = createSlice({
    name: "tags",
    initialState,
    reducers: {
        getTagsFetch: (state) => {
            state.isLoading = true;
        },
        getTagsSuccess: (state, action) => {
            state.value = action.payload;
            state.isLoading = false;
        },
        postTagFetch: (state, action) => {
            state.isLoading = true;
        },
        postTagSuccess: (state, action) => {
            state.value = [...state.value, action.payload];
            state.isLoading = false;
        },
        putTagFetch: (state, action) => {
            state.isLoading = true;
        },
        putTagSuccess: (state, action) => {
            const updatedTags = state.value.map((item) => {
                if (item._id === action.payload._id) {
                    return action.payload;
                }
                return item;
            });
            state.value = updatedTags;
            state.isLoading = false;
        },
        deleteTagFetch: (state, action) => {
            state.isLoading = true;
        },
        deleteTagSuccess: (state, action) => {
            const updateddTags = state.value.filter(item => item._id !== action.payload._id);
            state.value = updateddTags;
            state.isLoading = false;
        },
        failureTagsFetch: (state) => {
            state.isLoading = false;
        },
    },
});

export const {
    getTagsFetch,
    getTagsSuccess,
    postTagFetch,
    postTagSuccess,
    putTagFetch,
    putTagSuccess,
    deleteTagFetch,
    deleteTagSuccess,
    failureTagsFetch,
} = tagSlice.actions;
export const tagsSelect = (state: RootState) => state.tags;
export default tagSlice.reducer;
