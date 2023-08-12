import { all, fork } from "redux-saga/effects";
import authSaga from "./Auth";
import testSaga from "./Test";
import recipeSaga from "./Recipe";

function* rootSaga() {
  yield all([fork(authSaga)]);
  yield all([fork(testSaga)]);
  yield all([fork(recipeSaga)]);
}

export default rootSaga;