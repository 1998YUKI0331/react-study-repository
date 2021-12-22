## saga-example (21.12.22.)
- redux-saga의 컨셉
  - 비동기적인 dispatch를 원할 때 미들웨어인 redux-saga를 사용한다.
  - 사용자 부주의로 동일한 api에 요청을 보낼 경우 takeleast 요청의 응답만 받는다.
<br/>

- 함수 generator
  ```javascript
  function* generateSequence() {
      yield 1;
      yield 2;
      return 3;
  }
  let generator = generateSequence();
  let one = generator.next();
  alert(JSON.stringify(one)); // {value: 1, done: false}
  ```
  - 일반적인 함수는 하나의 값만 반환하지만 generator는 여러 값을 필요에 따라 하나씩 반환(yield)한다.
  - generator 함수를 호출하면 코드가 실행되지 않고, 실행을 처리하는 특별 객체, generator 객체가 반환된다.
  - 함수에 *를 붙이고, yield라는 문법을 사용. next()를 이용하여 다음 yield를 호출.
  - next()는 항상 두 property를 가진 객체를 반환한다. (value: 산출 값, done: 함수 코드 실행 T/F)
<br/>

- saga 모듈로 api 호출하기
  ```javascript
  import { takeEvery, put, call } from 'redux-saga/effects';
  import api from '../../api/index';
  import allAction from '../actions/index';
  
  function* getBook() {
      console.log("불러오기 성공");
      try {
          const { data } = yield call(api.searchBook);
          console.log(data);
          yield put(allAction.loadBookSuccess(data));
      } catch(error) {
          yield put(allAction.loadBookFail(error));
      }
  }
  
  function* rootSaga() {
      yield takeEvery("LOAD_BOOK", getBook);
  }

  export default rootSaga;
  ```
  - takeEvery는 dispatch에 의해 action.type이 "LOAD_BOOK'인 객체가 올 때 getBook을 실행시키라는 의미.
  - getBook에서는 call로 api를 호출하고 put으로 dispatch한다.
  - call 함수의 인자는 Promise를 반환해야 한다. (/api/index.js에서 axios.get()을 리턴하고 있어서 잘 됨)
<br/>

- redux saga의 흐름
  - View에서 action 발생. 그럼 dispatch()에서 action이 일어남.
  - action에 의한 reducer 함수가 실행되기 전에 middleware가 작동.
  - middleware에서 정의한 일을 수행하고 난뒤, reducer 함수를 실행.
  - reducer의 실행결과인 새로운 값을 store에 저장.
  - store의 state에 subscribe하고 있던 UI에 변경된 값을 전달.
