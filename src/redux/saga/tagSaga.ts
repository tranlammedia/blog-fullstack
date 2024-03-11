import { call, put, takeEvery } from "redux-saga/effects";
import { ApiTag } from "../../services/Api";

function* workGetTagsFetch(){
    try {
        
        const tags = yield call(ApiTag.getAll);
        yield put({ type: 'tags/getTagsSuccess', payload: tags });
    } catch (error) {
        yield put({ type: 'tags/failureTagsFetch' });
    }
}
function* workPostTagFetch(action) {
    try {
        const tag = yield call(ApiTag.createTag,action.payload);
        yield put({ type: 'tags/postTagSuccess', payload: tag });
    } catch (error) {
        yield put({ type: 'tags/failureTagsFetch' });
    }
}

function* workPutTagFetch(action) {
    try {
        const tag = yield call(ApiTag.updateTag,action.payload);
        yield put({ type: 'tags/putTagSuccess', payload: tag });
    } catch (error) {
        yield put({ type: 'tags/failureTagsFetch' });
    }
}

function* workDeleteTagFetch(action) {
    try {
        const tag = yield call(ApiTag.deleteTag,action.payload);
        yield put({ type: 'tags/deleteTagSuccess', payload: tag });
    } catch (error) {
        yield put({ type: 'tags/failureTagsFetch' });
    }
}

export default function* tagSaga() {
    yield takeEvery('tags/getTagsFetch', workGetTagsFetch);
    yield takeEvery('tags/postTagFetch', workPostTagFetch);
    yield takeEvery('tags/putTagFetch', workPutTagFetch);
    yield takeEvery('tags/deleteTagFetch', workDeleteTagFetch);
}