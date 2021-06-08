// action에 대해서 중간에 가로채기하여 처리하는 saga

import { call, put, takeEvery } from "redux-saga/effects";

import api from "../../api/todo";

function* addTodo(action) {
  console.log("--sagas: add Todo --");
  console.log(action);
  // 1. 서버의 REST API를 호출함
  // call: 비동기함수를 호출하는 이펙트
  // yield call(비동기함수, 매개변수1, 매개변수2........)
  // api.add(action.payload).then(result => result);
  const result = yield call(api.add, action.payload);
  console.log(result);
  // 2. API호출이 완료되면 state를 변경함
  // put: reducer에 state를 변경하는(dispatch) 이펙트
  yield put({
    type: "ADD_TODO_SUCCEEDED",
    payload: { id: result.data.id, ...action.payload },
  });
}

// todo list와 관련된 액션이 dispatch되면 중간에 처리할 함수 목록을 작성
function* todoSaga() {
  // takeEvery: 모든 dispatch하는 action에 대해서 처리함
  // takeLatest: 가장 나중에 dispatch하는 action에 대해서만 처리함
  yield takeEvery("ADD_TODO", addTodo);
}

export default todoSaga;
