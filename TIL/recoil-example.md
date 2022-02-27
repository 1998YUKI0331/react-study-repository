## Atom과 Selector
### Atom
Atom은 상태(state)의 일부를 나타낸다. Atoms는 어떤 컴포넌트에서나 읽고 쓸 수 있다. <br>
atom을 읽는다 = atom을 구독한다. 그래서 atom 값이 변하면 구독 컴포넌트들이 리렌더링 된다.<br>
컴포넌트가 atom을 읽고 쓰게 하기 위해서는 `useRecoilState()`를 아래와 같이 사용하면 된다.
```javascript
const textState = atom({
  key: 'textState', // unique ID (with respect to other atoms/selectors)
  default: '',      // default value (aka initial value)
});
```
```javascript
function TextInput() {
  const [text, setText] = useRecoilState(textState);

  const onChange = (event) => {
    setText(event.target.value);
  };

  return (
    <input type="text" value={text} onChange={onChange} />
  );
}
```
### Selector
Selector는 파생된 상태(derived state)의 일부를 나타낸다. 파생된 상태는 상태의 변화다. <br>
파생된 상태를 어떤 방법으로든 주어진 상태를 수정하는 순수 함수에 전달된 상태의 결과물로 생각할 수 있다. <br>
우리는 `useRecoilValue()` 훅을 사용해서 charCountState 값을 읽을 수 있다.
```javascript
const charCountState = selector({
  key: 'charCountState', // unique ID (with respect to other atoms/selectors)
  get: ({get}) => {
    const text = get(textState);
    return text.length;
  },
});
```
```javascript
function CharacterCount() {
  const count = useRecoilValue(charCountState);
  return <>Character Count: {count}</>;
}
```

## Recoil hooks
- useRecoilState(): setter의 역할. atom을 변경시킬 수 있다.
- useRecoilValue(): atom의 항목을 조회
- useSetRecoilState(): setter의 역할. atom을 변경시킬 수 있다.
- useResetRecoilState(): atom 값을 default 값으로 변경시켜준다.
> useRecoilState, useSetRecoilState 이 둘이 무슨 차이인지 와닿지 않았는데, 둘이 하는 역할은 비슷한거 같다. 그런데 useRecoilState는 [atom, setAtom]을 반환하고, 
> useSetRecoilState는 setter 함수 만을 반환한다.
