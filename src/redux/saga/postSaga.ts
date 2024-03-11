import { call, put, takeEvery } from "redux-saga/effects";
import { ApiPost } from "../../services/Api";

function* workGetPostFetch(action) {
    try {
        const postId = action.payload;
        const posts = yield call(ApiPost.getPost, postId);
        const post = posts[1];
        yield put({ type: "post/updatePostState", payload: post });
    } catch (error) {
        yield put({ type: "post/failurePostFetch" });
    }
}

function* workPostPostFetch(action) {
    try {
        const newPost = action.payload;
        const post = yield call(ApiPost.createPost, newPost);
        yield put({ type: "post/clearPostState" });
    } catch (error) {
        yield put({ type: "post/failurePostFetch" });
    }
}

function* workPutPostFetch(action) {
    try {
        const newPost = action.payload;
        const post = yield call(ApiPost.updatePost, newPost);
        yield put({ type: "post/clearPostState" });
    } catch (error) {
        yield put({ type: "post/failurePostFetch" });
    }
}

export default function* postSaga() {
    yield takeEvery("post/getPostFetch", workGetPostFetch);
    yield takeEvery("post/postPostFetch", workPostPostFetch);
    yield takeEvery("post/putPostFetch", workPutPostFetch);
}
