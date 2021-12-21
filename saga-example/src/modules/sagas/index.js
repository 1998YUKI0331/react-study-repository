import { takeEvery, put, call } from 'redux-saga/effects';
import api from '../../api/index';
import allAction from '../actions/index';

function* getBook() {
    console.log("불러오기 성공");
    try{
        const { data } = yield call(api.searchBook);
        console.log(data);
        yield put(allAction.loadBookSuccess(data));
    }catch(error){
        yield put(allAction.loadBookFail(error));
    }
}

function* rootSaga(){
    yield takeEvery("LOAD_BOOK", getBook);
}

export default rootSaga;