## react-query의 사용 이유 및 장점
### 사용 이유
서버와 클라이언트의 데이터를 분리하기 위해서. 서버의 값을 클라이언트에 가져오거나, 캐싱, 값 업데이트, 에러 핸들링 등 비동기 과정을 더욱 편하게 하는데 사용
### 장점
- 데이터 캐싱
- get한 데이터가 update되면 알아서 다시 get 수행
- 데이터가 오래 되었다고 판단되면 다시 get(invalidateQueries)
- 동일 데이터 여러번 요청하면 한번만 요청 (옵션에 따라 설정)

<br>

## useQuery
### 사용법 및 개념
```javascript
const { isLoading, error, data } = useQuery('repoData', () =>
  fetch('https://api.github.com/repos/tannerlinsley/react-query').then(res =>
    res.json()
)
```
- 데이터를 get하기 위한 api
- 첫번째 파라미터로 unique key가 들어가고 두번째 파라미터로 api 호출 함수를 비롯한 비동기 함수가 들어감
- useQuery는 비동기로 작동한다. 즉 한 컴포넌트에 여러 useQuery가 있다면 useQuery들이 동시에 실행된다. 그러므로 여러 개의 비동기 query가 있다면 useQueries가 적절
- return되는 result의 종류는 매우 다양. [링크](https://react-query.tanstack.com/reference/useQuery) 참고

### 동기적인 useQuery
```javascript
const { data: todoList, error, isFetching } = useQuery("todos", fetchTodoList);
const { data: nextTodo, error, isFetching } = useQuery(
  "nextTodos",
  fetchNextTodoList,
  {
    enabled: !!todoList // true가 되면 fetchNextTodoList를 실행한다
  }
);
```
- enabled 옵션을 사용하면 useQuery를 동기적으로 사용 가능
- useQuery의 3번째 인자로 옵션값이 들어가는데 그 옵션의 enabled에 값을 넣으면 그 값이 true일때 useQuery를 실행한다. 이를 이용하면 동기적으로 함수 실행 가능

<br>

## useMutation
### 사용법 및 개념
```javascript
const loginMutation = useMutation(loginApi, {
  onMutate: variable => { 시작 },
  onError: (error, variable, context) => { 에러 },
  onSuccess: (data, variables, context) => { 성공 },
  onSettled: () => { 성공이거나 에러나 상관 없이 }
});

const handleSubmit = () => {
  loginMutation.mutate({ loginId: id, password });
};
```
- CUD를 위해 사용하는 api. return 값은 useQuery와 동일
- 위 코드와 같이 라이프사이클 인터셉트에 따라 분기할 수도 있음

### update후에 get 다시 실행
```javascript
const mutation = useMutation(postTodo, {
  onSuccess: () => {
    // postTodo가 성공하면 todos로 맵핑된 useQuery api 함수를 실행
    queryClient.invalidateQueries("todos");
  }
});
```
- mutation 함수가 성공할 때, unique key로 맵핑된 get 함수를 invalidateQueries에 넣어주면 update 후에 get을 간단히 재실행 가능
- 만약 mutation에서 return된 값을 이용해서 get 함수의 파라미터를 변경해야할 경우 setQueryData를 사용

<br>

## 레퍼런스
- https://react-query.tanstack.com/
- https://kyounghwan01.github.io/blog/React/react-query/basic/
- https://liltdevs.tistory.com/28
