import { CategoryType } from "./../../../../server/src/interfaces";
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface BaseState<T> {
    value: T[];
    isLoading: boolean;
}

const initialState: BaseState<CategoryType> = {
    value: [],
    isLoading: false,
};

export const categorySlice = createSlice({
    name: "categories",
    initialState,
    reducers: {
        getCategoriesFetch: (state) => {
            state.isLoading = true;
        },
        getCategoriesSuccess: (state, action) => {
            state.value = action.payload;
            state.isLoading = false;
        },
        postCategoryFetch: (state, action) => {
            state.isLoading = true;
        },
        postCategorySuccess: (state, action) => {
            state.value = [...state.value, action.payload];
            state.isLoading = false;
        },
        putCategoryFetch: (state, action) => {
            state.isLoading = true;
        },
        putCategorySuccess: (state, action) => {
            const updatedCategories = state.value.map((item) => {
                if (item._id === action.payload._id) {
                    return action.payload;
                }
                return item;
            });
            state.value = updatedCategories;
            state.isLoading = false;
        },
        deleteCategoryFetch: (state, action) => {
            state.isLoading = true;
        },
        deleteCategorySuccess: (state, action) => {
            const updatedCategories = state.value.filter(item => item._id !== action.payload._id);
            state.value = updatedCategories;
            state.isLoading = false;
        },
        failureCategoriesFetch: (state) => {
            state.isLoading = false;
        },
    },
});

export const {
    getCategoriesSuccess,
    getCategoriesFetch,
    postCategoryFetch,
    postCategorySuccess,
    putCategoryFetch,
    putCategorySuccess,
    deleteCategoryFetch,
    deleteCategorySuccess,
    failureCategoriesFetch,
} = categorySlice.actions;
export const categoriesSelect = (state: RootState) => state.categories;
export default categorySlice.reducer;
