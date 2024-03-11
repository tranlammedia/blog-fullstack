import { all, fork } from "redux-saga/effects";
import categorySaga from "./categorySaga";
import tagSaga from "./tagSaga";
import postSaga from "./postSaga";

function* rootSaga() {
    yield all([
        fork(categorySaga), 
        fork(tagSaga), 
        fork(postSaga)
    
    ]);
}

export default rootSaga;
