import { GET_TEST_API_DATA } from "../Actions/ActionType";
import { startLoader, stopLoader } from "../Actions/Loader";
import { getRequest, postRequest } from "../../Shared/Axios";
import { STATUS_CODE } from "../../Shared/Constants";
import { API } from "../../Services/constants";
import { all, put, takeLatest } from "redux-saga/effects";

function* makeTestRequest({payload}) {
    try {
        yield put(startLoader())
        const {data, status} = yield getRequest({
            API: API?.TEST,
            DATA: payload?.formData
        })
        console.log(data)
        if (status === STATUS_CODE.SUCCESS_200) {
            if (payload?.success) {
                payload?.success(data);
            }
        }
    
    } catch (error) {
        console.log(error);
        if (payload?.fail) {
            payload?.fail(error?.response?.data?.errMgs);
        }
    }
    finally{
        yield put(stopLoader())
    }
}

function* testSaga() {
    yield all([
        takeLatest(GET_TEST_API_DATA, makeTestRequest),  
    ]);
}

export default testSaga;