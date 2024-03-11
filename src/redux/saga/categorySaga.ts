import { call, put, takeEvery, all, fork } from "redux-saga/effects";
import { ApiCategory } from "../../services/Api";

function* workGetCategoriesFetch(){
    try {
        const categories = yield call(ApiCategory.getAll);
        yield put({ type: 'categories/getCategoriesSuccess', payload: categories });
    } catch (error) {
        yield put({ type: 'categories/failureCategoriesFetch' });
    }
}

function* workPostCategoryFetch(action) {
    try {
        const category = yield call(ApiCategory.createCategory,action.payload);
        yield put({ type: 'categories/postCategorySuccess', payload: category });
    } catch (error) {
        yield put({ type: 'categories/failureCategoriesFetch' });
    }
}

function* workPutCategoryFetch(action) {
    try {
        const category = yield call(ApiCategory.updateCategory,action.payload);
        yield put({ type: 'categories/putCategorySuccess', payload: category });
    } catch (error) {
        yield put({ type: 'categories/failureCategoriesFetch' });
    }
}

function* workDeleteCategoryFetch(action) {
    try {
        const category = yield call(ApiCategory.deleteCategory,action.payload);
        yield put({ type: 'categories/deleteCategorySuccess', payload: category });
    } catch (error) {
        yield put({ type: 'categories/failureCategoriesFetch' });
    }
}

export default function* categorySaga() {
    yield takeEvery('categories/getCategoriesFetch', workGetCategoriesFetch);
    yield takeEvery('categories/postCategoryFetch', workPostCategoryFetch);
    yield takeEvery('categories/putCategoryFetch', workPutCategoryFetch);
    yield takeEvery('categories/deleteCategoryFetch', workDeleteCategoryFetch);
}