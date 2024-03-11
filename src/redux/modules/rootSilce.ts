import { combineReducers } from "@reduxjs/toolkit"

import categoryReducer from "./categorySlice";
import tagReducer from "./tagSlice";
import postReducer from "./postSlice";

const rootReducer = combineReducers({
    categories: categoryReducer,
    tags: tagReducer,
    post: postReducer,
})

export default rootReducer